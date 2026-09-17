<div class="field {{ ($full ?? false) ? 'full' : '' }}">
    <label for="{{ str_ends_with($key, '_image') ? $key . '_upload' : $key }}">{{ $label }}</label>
    @if (str_ends_with($key, '_description'))
        <textarea id="{{ $key }}" name="{{ $key }}" rows="3">{{ old($key, $content[$key] ?? '') }}</textarea>
    @elseif (str_ends_with($key, '_image'))
        <input id="{{ $key }}_upload" name="{{ $key }}_upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif">
        @if (!empty($content[$key]))
            <img class="content-preview" src="{{ $content[$key] }}" alt="Current {{ $label }}">
            <label class="content-clear"><input name="{{ $key }}_clear" type="checkbox" value="1"> Use the default image</label>
        @endif
        <span class="field-hint">Upload a JPG, PNG, WEBP, or AVIF image up to 5 MB. Uploading replaces the current image.</span>
    @else
        <input id="{{ $key }}" name="{{ $key }}" value="{{ old($key, $content[$key] ?? '') }}">
    @endif
    @if (!empty($hint))<span class="field-hint">{{ $hint }}</span>@endif
</div>
