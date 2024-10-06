import os

# 指定图片所在的文件夹路径
folder_path = './images/song_covers'

# 获取文件夹中所有文件的名称
files = os.listdir(folder_path)

# 循环处理每个文件
for filename in files:
    # 检查文件名中是否包含 "-"
    if ('-' in filename) or ('200' in filename):
        if '-' in filename:
            # 将 "-" 替换为 " "
            new_filename = filename.replace('-', ' ')
        
        if '200' in filename:
            # 将 "200" 替换为 "100"
            new_filename = new_filename.replace('200', '100')
        
        # 构建新的文件路径
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_filename)
        
        # 重命名文件
        os.rename(old_path, new_path)
        print(f'Renamed {filename} to {new_filename}')
