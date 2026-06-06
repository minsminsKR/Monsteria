import os
import wave
import math
import struct

def write_wav(filename, duration, sample_rate=22050, func=None):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with wave.open(filename, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        
        num_samples = int(duration * sample_rate)
        for i in range(num_samples):
            t = i / sample_rate
            val = func(t, duration)
            val = max(-1.0, min(1.0, val))
            sample = int(val * 32767)
            w.writeframesraw(struct.pack('<h', sample))

# Define the generator functions for all audio events
def click_fn(t, d):
    freq = 600 - (t / d) * 450
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.3

def hover_fn(t, d):
    freq = 300 - (t / d) * 100
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.1

def hit_fn(t, d):
    freq = 140 - (t / d) * 95
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.6

def break_fn(t, d):
    freq = 200 - (t / d) * 170
    noise = math.sin(2 * math.pi * freq * t) + math.sin(t * 10000) * 0.3
    return noise * (1.0 - t/d) * 0.4

def loot_fn(t, d):
    if t < 0.08:
        freq = 850
    else:
        freq = 1250
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.2

def buy_fn(t, d):
    if t < 0.08:
        freq = 587.33
    else:
        freq = 880.00
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.25

def charge_fn(t, d):
    freq = 180 + (t / d) * 470
    return math.sin(2 * math.pi * freq * t) * (t / d) * 0.3

def success_fn(t, d):
    if t < 0.1:
        freq = 523.25
    elif t < 0.2:
        freq = 659.25
    elif t < 0.3:
        freq = 783.99
    else:
        freq = 1046.50
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.25

def fail_fn(t, d):
    freq = 300 - (t / d) * 150
    val = math.sin(2 * math.pi * freq * t)
    val = 0.2 if val > 0 else -0.2
    return val * (1.0 - t/d)

def shoot_fn(t, d):
    freq = 850 - (t / d) * 670
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.2

def skill_fn(t, d):
    freq = 1200 - (t / d) * 1110
    vibrato = math.sin(2 * math.pi * 32 * t) * 140
    return math.sin(2 * math.pi * (freq + vibrato) * t) * (1.0 - t/d) * 0.25

def hurt_fn(t, d):
    freq = 110 - (t / d) * 85
    noise = math.sin(2 * math.pi * freq * t) + math.sin(t * 12000) * 0.2
    return noise * (1.0 - t/d) * 0.4

def victory_fn(t, d):
    step = int(t / 0.08)
    notes = [523.25, 659.25, 783.99, 659.25, 783.99, 1046.50, 1046.50, 1046.50]
    freq = notes[min(step, len(notes) - 1)]
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.25

def defeat_fn(t, d):
    step = int(t / 0.18)
    notes = [392.00, 311.13, 293.66, 261.63, 261.63]
    freq = notes[min(step, len(notes) - 1)]
    return math.sin(2 * math.pi * freq * t) * (1.0 - t/d) * 0.3

def bgm_main_fn(t, d):
    beat = int(t / 0.5)
    notes_c = [261.63, 329.63, 392.00, 523.25]
    notes_g = [196.00, 246.94, 293.66, 392.00]
    notes_am = [220.00, 261.63, 329.63, 440.00]
    notes_f = [174.61, 220.00, 261.63, 349.23]
    progression = [notes_c, notes_c, notes_g, notes_g, notes_am, notes_am, notes_f, notes_f]
    current_chord = progression[min(beat, len(progression) - 1)]
    
    note_index = int((t % 0.5) / 0.25)
    freq = current_chord[note_index % len(current_chord)]
    return math.sin(2 * math.pi * freq * t) * 0.12

def bgm_battle_fn(t, d):
    beat = int(t / 0.4)
    notes_dm = [293.66, 349.23, 440.00, 587.33]
    notes_gm = [392.00, 466.16, 587.33, 783.99]
    notes_am = [440.00, 523.25, 659.25, 880.00]
    progression = [notes_dm, notes_dm, notes_gm, notes_gm, notes_am, notes_am, notes_dm, notes_dm, notes_dm, notes_dm]
    current_chord = progression[min(beat, len(progression) - 1)]
    
    note_index = int((t % 0.4) / 0.2)
    freq = current_chord[note_index % len(current_chord)]
    
    val = math.sin(2 * math.pi * freq * t)
    val = 0.08 if val > 0 else -0.08
    return val

def main():
    dest_dir = os.path.join("assets", "sounds")
    print(f"Generating audio files in: {dest_dir}...")
    
    sfxs = {
        "click.wav": (0.05, click_fn),
        "hover.wav": (0.03, hover_fn),
        "hit.wav": (0.12, hit_fn),
        "break.wav": (0.3, break_fn),
        "loot.wav": (0.2, loot_fn),
        "buy.wav": (0.25, buy_fn),
        "charge.wav": (0.85, charge_fn),
        "success.wav": (0.6, success_fn),
        "fail.wav": (0.45, fail_fn),
        "shoot.wav": (0.14, shoot_fn),
        "skill.wav": (0.3, skill_fn),
        "hurt.wav": (0.14, hurt_fn),
        "victory.wav": (0.6, victory_fn),
        "defeat.wav": (0.8, defeat_fn),
        "bgm_main.wav": (4.0, bgm_main_fn),
        "bgm_battle.wav": (4.0, bgm_battle_fn),
    }
    
    for filename, (duration, fn) in sfxs.items():
        path = os.path.join(dest_dir, filename)
        write_wav(path, duration, func=fn)
        print(f"  Generated {filename} ({duration}s)")
    
    print("All audio files generated successfully!")

if __name__ == "__main__":
    main()
