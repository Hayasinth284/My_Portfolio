import os
import shutil

src_dir = os.path.join(os.path.dirname(__file__), 'client', 'public')
dst_dir = os.path.join(os.path.dirname(__file__), 'static', 'images')

os.makedirs(dst_dir, exist_ok=True)

if os.path.exists(src_dir):
    for f in os.listdir(src_dir):
        src_f = os.path.join(src_dir, f)
        dst_f = os.path.join(dst_dir, f)
        if os.path.isfile(src_f):
            shutil.copy2(src_f, dst_f)
            print(f"Copied {f} to static/images/")
