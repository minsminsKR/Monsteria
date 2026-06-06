# Native PowerShell retro audio generator for Monsteria

function Write-WavFile($path, $duration, $sampleRate, $generatorScriptBlock) {
    $numSamples = [int]($duration * $sampleRate)
    $dataSize = $numSamples * 2
    $chunkSize = 36 + $dataSize

    $stream = New-Object System.IO.MemoryStream
    $writer = New-Object System.IO.BinaryWriter($stream)

    # Write RIFF WAVE header
    $writer.Write([char[]]"RIFF")
    $writer.Write([int]$chunkSize)
    $writer.Write([char[]]"WAVE")
    $writer.Write([char[]]"fmt ")
    $writer.Write([int]16)
    $writer.Write([System.Int16]1) # PCM
    $writer.Write([System.Int16]1) # 1 channel (mono)
    $writer.Write([int]$sampleRate)
    $writer.Write([int]($sampleRate * 2)) # ByteRate
    $writer.Write([System.Int16]2) # BlockAlign
    $writer.Write([System.Int16]16) # BitsPerSample
    $writer.Write([char[]]"data")
    $writer.Write([int]$dataSize)

    # Write PCM samples
    for ($i = 0; $i -lt $numSamples; $i++) {
        $t = $i / $sampleRate
        $val = & $generatorScriptBlock $t $duration
        # Clamp value to [-1.0, 1.0]
        if ($val -gt 1.0) { $val = 1.0 }
        elseif ($val -lt -1.0) { $val = -1.0 }
        
        $sample = [System.Int16]($val * 32767)
        $writer.Write($sample)
    }

    $bytes = $stream.ToArray()
    $writer.Close()
    $stream.Close()

    # Ensure parent directory exists
    $dir = [System.IO.Path]::GetDirectoryName($path)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    [System.IO.File]::WriteAllBytes($path, $bytes)
}

$destDir = Join-Path (Get-Location).Path "assets\sounds"
Write-Host "Generating audio files in: $destDir..."

# 1. click
$click_fn = {
    param($t, $d)
    $freq = 600 - ($t / $d) * 450
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.3
}
Write-WavFile (Join-Path $destDir "click.wav") 0.05 22050 $click_fn
Write-Host "  Generated click.wav"

# 2. hover
$hover_fn = {
    param($t, $d)
    $freq = 300 - ($t / $d) * 100
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.1
}
Write-WavFile (Join-Path $destDir "hover.wav") 0.03 22050 $hover_fn
Write-Host "  Generated hover.wav"

# 3. hit
$hit_fn = {
    param($t, $d)
    $freq = 140 - ($t / $d) * 95
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.6
}
Write-WavFile (Join-Path $destDir "hit.wav") 0.12 22050 $hit_fn
Write-Host "  Generated hit.wav"

# 4. break
$break_fn = {
    param($t, $d)
    $freq = 200 - ($t / $d) * 170
    $noise = [math]::Sin(2 * [math]::PI * $freq * $t) + [math]::Sin($t * 10000) * 0.3
    $noise * (1.0 - $t/$d) * 0.4
}
Write-WavFile (Join-Path $destDir "break.wav") 0.3 22050 $break_fn
Write-Host "  Generated break.wav"

# 5. loot
$loot_fn = {
    param($t, $d)
    $freq = if ($t -lt 0.08) { 850 } else { 1250 }
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.2
}
Write-WavFile (Join-Path $destDir "loot.wav") 0.2 22050 $loot_fn
Write-Host "  Generated loot.wav"

# 6. buy
$buy_fn = {
    param($t, $d)
    $freq = if ($t -lt 0.08) { 587.33 } else { 880.00 }
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.25
}
Write-WavFile (Join-Path $destDir "buy.wav") 0.25 22050 $buy_fn
Write-Host "  Generated buy.wav"

# 7. charge
$charge_fn = {
    param($t, $d)
    $freq = 180 + ($t / $d) * 470
    [math]::Sin(2 * [math]::PI * $freq * $t) * ($t / $d) * 0.3
}
Write-WavFile (Join-Path $destDir "charge.wav") 0.85 22050 $charge_fn
Write-Host "  Generated charge.wav"

# 8. success
$success_fn = {
    param($t, $d)
    $freq = if ($t -lt 0.1) { 523.25 } elseif ($t -lt 0.2) { 659.25 } elseif ($t -lt 0.3) { 783.99 } else { 1046.50 }
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.25
}
Write-WavFile (Join-Path $destDir "success.wav") 0.6 22050 $success_fn
Write-Host "  Generated success.wav"

# 9. fail
$fail_fn = {
    param($t, $d)
    $freq = 300 - ($t / $d) * 150
    $val = [math]::Sin(2 * [math]::PI * $freq * $t)
    $buzz = if ($val -gt 0) { 0.2 } else { -0.2 }
    $buzz * (1.0 - $t/$d)
}
Write-WavFile (Join-Path $destDir "fail.wav") 0.45 22050 $fail_fn
Write-Host "  Generated fail.wav"

# 10. shoot
$shoot_fn = {
    param($t, $d)
    $freq = 850 - ($t / $d) * 670
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.2
}
Write-WavFile (Join-Path $destDir "shoot.wav") 0.14 22050 $shoot_fn
Write-Host "  Generated shoot.wav"

# 11. skill
$skill_fn = {
    param($t, $d)
    $freq = 1200 - ($t / $d) * 1110
    $vibrato = [math]::Sin(2 * [math]::PI * 32 * $t) * 140
    [math]::Sin(2 * [math]::PI * ($freq + $vibrato) * $t) * (1.0 - $t/$d) * 0.25
}
Write-WavFile (Join-Path $destDir "skill.wav") 0.3 22050 $skill_fn
Write-Host "  Generated skill.wav"

# 12. hurt
$hurt_fn = {
    param($t, $d)
    $freq = 110 - ($t / $d) * 85
    $noise = [math]::Sin(2 * [math]::PI * $freq * $t) + [math]::Sin($t * 12000) * 0.2
    $noise * (1.0 - $t/$d) * 0.4
}
Write-WavFile (Join-Path $destDir "hurt.wav") 0.14 22050 $hurt_fn
Write-Host "  Generated hurt.wav"

# 13. victory
$victory_fn = {
    param($t, $d)
    $step = [int]($t / 0.08)
    $notes = @(523.25, 659.25, 783.99, 659.25, 783.99, 1046.50, 1046.50, 1046.50)
    $freq = $notes[[math]::Min($step, $notes.Length - 1)]
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.25
}
Write-WavFile (Join-Path $destDir "victory.wav") 0.6 22050 $victory_fn
Write-Host "  Generated victory.wav"

# 14. defeat
$defeat_fn = {
    param($t, $d)
    $step = [int]($t / 0.18)
    $notes = @(392.00, 311.13, 293.66, 261.63, 261.63)
    $freq = $notes[[math]::Min($step, $notes.Length - 1)]
    [math]::Sin(2 * [math]::PI * $freq * $t) * (1.0 - $t/$d) * 0.3
}
Write-WavFile (Join-Path $destDir "defeat.wav") 0.8 22050 $defeat_fn
Write-Host "  Generated defeat.wav"

# 15. bgm_main
$bgm_main_fn = {
    param($t, $d)
    $beat = [int]($t / 0.5)
    $notes_c = @(261.63, 329.63, 392.00, 523.25)
    $notes_g = @(196.00, 246.94, 293.66, 392.00)
    $notes_am = @(220.00, 261.63, 329.63, 440.00)
    $notes_f = @(174.61, 220.00, 261.63, 349.23)
    $progression = @($notes_c, $notes_c, $notes_g, $notes_g, $notes_am, $notes_am, $notes_f, $notes_f)
    $current_chord = $progression[[math]::Min($beat, $progression.Length - 1)]
    
    $note_index = [int](($t % 0.5) / 0.25)
    $freq = $current_chord[$note_index % $current_chord.Length]
    [math]::Sin(2 * [math]::PI * $freq * $t) * 0.12
}
Write-WavFile (Join-Path $destDir "bgm_main.wav") 4.0 22050 $bgm_main_fn
Write-Host "  Generated bgm_main.wav"

# 16. bgm_battle
$bgm_battle_fn = {
    param($t, $d)
    $beat = [int]($t / 0.4)
    $notes_dm = @(293.66, 349.23, 440.00, 587.33)
    $notes_gm = @(392.00, 466.16, 587.33, 783.99)
    $notes_am = @(440.00, 523.25, 659.25, 880.00)
    $progression = @($notes_dm, $notes_dm, $notes_gm, $notes_gm, $notes_am, $notes_am, $notes_dm, $notes_dm, $notes_dm, $notes_dm)
    $current_chord = $progression[[math]::Min($beat, $progression.Length - 1)]
    
    $note_index = [int](($t % 0.4) / 0.2)
    $freq = $current_chord[$note_index % $current_chord.Length]
    
    $val = [math]::Sin(2 * [math]::PI * $freq * $t)
    $buzz = if ($val -gt 0) { 0.08 } else { -0.08 }
    $buzz
}
Write-WavFile (Join-Path $destDir "bgm_battle.wav") 4.0 22050 $bgm_battle_fn
Write-Host "  Generated bgm_battle.wav"

Write-Host "All audio files generated successfully!"
