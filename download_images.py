import requests
import os
from PIL import Image

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Function to download and resize image
def download_image(url, filename, width=1200, height=600):
    response = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(response.content)
    
    # Resize image
    img = Image.open(filename)
    img = img.resize((width, height), Image.Resampling.LANCZOS)
    img.save(filename)

# Download tech-related image
print("Downloading tech image...")
download_image(
    "https://source.unsplash.com/1200x600/?coding,programming,technology",
    "images/tech-header.jpg"
)

# Download Japan-related image
print("Downloading Japan image...")
download_image(
    "https://source.unsplash.com/1200x600/?japan,kyoto,tokyo",
    "images/japan-header.jpg"
)

print("Images downloaded successfully!")
