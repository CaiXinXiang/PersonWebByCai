# 🎤 FunASR 本地语音识别 WebUI

基于 [FunASR](https://github.com/modelscope/FunASR) 和 [Gradio](https://gradio.app/) 的本地语音识别 Web 应用。

## ✨ 功能特性

- 🌐 **多语言识别**: 支持中文、英文、日语、韩语、粤语等 50+ 语言
- 👥 **发言人分离**: 自动识别并区分不同说话人
- 📝 **结果导出**: 一键导出识别结果为 TXT 文件
- 🚀 **GPU 加速**: 支持 NVIDIA GPU CUDA 加速
- 🔒 **本地运行**: 所有处理在本地完成，无需联网

## 📋 系统要求

- Python 3.9+
- 4GB+ 内存（推荐 8GB）
- （可选）NVIDIA GPU + CUDA 驱动

## 🚀 快速开始

### Windows

```bash
# 一键安装
setup.bat

# 启动
start.bat
```

### Linux / Mac

```bash
# 一键安装
chmod +x setup.sh start.sh
./setup.sh

# 启动
./start.sh
```

### 手动安装

```bash
# 1. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或 venv\Scripts\activate  # Windows

# 2. 安装 PyTorch
# CPU 版本:
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cpu
# CUDA 12.4 版本 (NVIDIA GPU):
# pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu124

# 3. 安装其他依赖
pip install -r requirements.txt

# 4. 启动
python webui.py
```

启动后访问 http://127.0.0.1:7860

## 📖 使用说明

### 基本使用

1. 选择识别模型（默认 SenseVoiceSmall 支持多语言）
2. 勾选「启用发言人分离」可区分不同说话人
3. 点击「🚀 加载模型」（首次会下载模型）
4. 上传音频文件或录音
5. 点击「🔊 开始识别」
6. 点击「💾 导出为 TXT」保存结果

### 模型选择

| 模型 | 适用场景 |
|------|----------|
| `iic/SenseVoiceSmall` | 多语言识别，支持情感检测 |
| `paraformer-zh` | 中文高精度识别 |
| `paraformer-en` | 英文识别 |

### 发言人分离输出格式

```
[0.8s - 3.3s] 发言人0: 喂喂，你好，有什么事儿？

[3.3s - 35.0s] 发言人1: 我是美团的工作人员，工号一九二二四三...
```

同一发言人连续说话会自动合并。

## 📁 项目结构

```
.
├── webui.py           # WebUI 主程序
├── test_funasr.py     # 测试脚本
├── requirements.txt   # 依赖清单
├── setup.bat          # Windows 安装脚本
├── setup.sh           # Linux/Mac 安装脚本
├── start.bat          # Windows 启动脚本
├── start.sh           # Linux/Mac 启动脚本
└── .gitignore         # Git 忽略规则
```

## 🛠️ 高级配置

### GPU 加速

如果你有 NVIDIA 显卡，安装 CUDA 版 PyTorch 可大幅提升识别速度：

```bash
pip uninstall torch torchaudio -y
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu124
```

### FFmpeg 支持（可选）

安装 FFmpeg 可支持更多音频格式：

```bash
# Windows
winget install Gyan.FFmpeg

# Ubuntu
sudo apt install ffmpeg

# Mac
brew install ffmpeg
```

## 📄 License

本项目基于 [MIT License](LICENSE) 开源。

FunASR 由阿里通义实验室开源。

## 🙏 致谢

- [FunASR](https://github.com/modelscope/FunASR) - 工业级语音识别工具包
- [Gradio](https://gradio.app/) - 快速构建 ML WebUI
