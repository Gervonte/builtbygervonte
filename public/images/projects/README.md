# Project Images

This directory contains local images for project thumbnails. These images will be used as the primary source for project screenshots, with live URL screenshots as fallbacks.

## 🎯 How to Use

1. **Add your project images** to this directory
2. **Update the project metadata** in `src/data/projects-metadata.json` to include the `imagePath` field
3. **Image formats supported**: PNG, JPG, JPEG, WebP, SVG
4. **Recommended dimensions**: 
   - Thumbnail: 160x120px (4:3 aspect ratio)
   - Card: 300x200px (3:2 aspect ratio)
   - Hero: 1200x675px (16:9 aspect ratio)

## 📝 Example

```json
{
  "id": "my-project",
  "title": "My Project",
  "imagePath": "my-project.png",
  "liveUrl": "https://my-project.vercel.app"
}
```

## 🔄 Priority Order

1. **Local image** (`imagePath`) - highest priority
2. **Live URL screenshot** (`liveUrl`) - fallback
3. **Generated placeholder** - final fallback

## ✅ Benefits

- **Faster loading**: No external API calls needed
- **Reliable**: No dependency on external screenshot services
- **Customizable**: Full control over image content and quality
- **Offline support**: Works without internet connection
- **Production ready**: No external service dependencies

## 🖼️ Image Guidelines

### Best Practices
- Use high-quality images that represent your project well
- Ensure images are optimized for web (compressed but clear)
- Consider using WebP format for better compression
- Test images on different screen sizes

### File Naming
- Use descriptive, lowercase names with hyphens
- Examples: `portfolio-ai.png`, `e-commerce-app.jpg`, `data-visualization.svg`

### Current Images
- `portfolio-ai2.png` - Portfolio AI project
- `audio-analyzer3.png` - Audio Key BPM Analyzer project

## 🔧 Troubleshooting

### Image Not Showing?
1. Check the file exists in `/public/images/projects/`
2. Verify the `imagePath` in `projects-metadata.json` matches the filename
3. Ensure the image format is supported (PNG, JPG, JPEG, WebP, SVG)
4. Check browser console for 404 errors

### Image Quality Issues?
1. Use images with appropriate dimensions (300x200px recommended)
2. Optimize images for web (compress but maintain quality)
3. Consider using SVG for simple graphics or logos

### Fallback to Screenshots?
If local images aren't working, the system will automatically fall back to:
1. Live URL screenshots (if `liveUrl` is provided)
2. Generated SVG placeholders (final fallback)
