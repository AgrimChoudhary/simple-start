import sys
import os

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("rembg or Pillow not installed. Exiting.")
    sys.exit(1)

def process_image(input_path, output_path):
    print(f"Processing {input_path} ...")
    try:
        input_image = Image.open(input_path)
        
        # Remove background using rembg
        # alpha_matting is often good for smooth edges around hair/clothes
        output_image = remove(input_image, alpha_matting=True)
        
        output_image.save(output_path)
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python bg_remove.py <input_file1> <output_file1> [<input_file2> <output_file2>]")
        sys.exit(1)

    for i in range(1, len(sys.argv), 2):
        if i+1 < len(sys.argv):
            in_file = sys.argv[i]
            out_file = sys.argv[i+1]
            process_image(in_file, out_file)
