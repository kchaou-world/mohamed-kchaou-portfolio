#!/usr/bin/env python3
"""Seamless looping hero clip.
Usage: python3 scripts/build-hero-assets.py SRC.mp4 [x y w h]
Default crop 576x720 @ x=337,y=0 (4:5) for a 1280x720 source with the person centred."""
import subprocess as sp, sys, numpy as np, os, tempfile
src = sys.argv[1]
x, y, w, h = (map(int, sys.argv[2:6]) if len(sys.argv) >= 6 else (337, 0, 576, 720))
X, SR = 0.5, 48000
out = "public/hero"; os.makedirs(out, exist_ok=True)
run = lambda *a: sp.run(["ffmpeg", "-v", "error", "-y", *a], check=True)
dur = float(sp.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src]))
T = min(dur, 10.0)
white = "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
tmp = tempfile.mkdtemp(); base, loopv, wav = f"{tmp}/b.mp4", f"{tmp}/l.mp4", f"{tmp}/a.wav"
run("-i", src, "-t", str(T), "-vf", f"crop={w}:{h}:{x}:{y},scale=768:960:flags=lanczos,{white},fps=24,format=yuv420p", "-an", base)
# loop layout: [seam: tail X sec fading into head X sec] + [body: X .. T-X]
run("-i", base, "-i", base, "-filter_complex",
    f"[0]trim={T-X}:{T},setpts=PTS-STARTPTS[tail];[1]trim=0:{X},setpts=PTS-STARTPTS[head];"
    f"[tail][head]xfade=transition=fade:duration={X}:offset=0,trim=duration={X},setpts=PTS-STARTPTS[seam];"
    f"[1]trim={X}:{T-X},setpts=PTS-STARTPTS[body];[seam][body]concat=n=2:v=1[v]", "-map", "[v]", "-an", loopv)
# same layout for audio, equal-power cross-fade done sample-accurately in numpy
run("-i", src, "-t", str(T), "-ac", "1", "-ar", str(SR), "-f", "f32le", f"{tmp}/a.raw")
N, n = int(T*SR), int(X*SR)
a = np.fromfile(f"{tmp}/a.raw", dtype="<f4")[:N]
t = np.linspace(0, np.pi/2, n, dtype=np.float32)
loop = np.concatenate([a[N-n:]*np.cos(t) + a[:n]*np.sin(t), a[n:N-n]]).astype("<f4")
loop.tofile(f"{tmp}/loop.raw")
run("-f","f32le","-ar",str(SR),"-ac","1","-i",f"{tmp}/loop.raw",wav)
enc = {"hero.mp4": ["-c:v","libx264","-crf","24","-preset","slow","-pix_fmt","yuv420p","-c:a","aac","-b:a","96k","-movflags","+faststart"],
       "hero.webm": ["-c:v","libvpx-vp9","-crf","36","-b:v","0","-c:a","libopus","-b:a","80k"]}
for name, opts in enc.items():
    run("-i", loopv, "-i", wav, *opts, "-shortest", f"{out}/{name}")
run("-ss","4","-i",src,"-frames:v","1","-vf",f"crop=264:330:{x+156}:0,scale=480:600:flags=lanczos,{white}","public/portrait-bust.webp")
run("-ss","4","-i",src,"-frames:v","1","-vf",f"crop=576:302:{x}:0,scale=1200:630,{white}","-q:v","3","public/og.jpg")
print("ok")
