---
title: 银河麒麟V4安装Docker
date: 2020-09-30
tags: note
---

**（适用于银河麒麟4.0.2社区版操作系统）**

#### 0、下载deb包
银河麒麟v4操作系统，基于ubuntu1604LTS，下载对应版本的deb包可直接安装。
直接在这个网站搜寻ubuntu仓库的deb包，输入包名即可。（需要科学上网）
`https://pkgs.org`


#### 1、在干净的银河麒麟操作系统中，安装必须的组件lrzsz、htop：
```
sudo dpkg -i lrzsz_0.12.21-10_build0.16.04.1_amd64.deb
sudo dpkg -i htop_2.0.1-1_amd64.deb
```

#### 2、安装docker deb包，依次安装如下组件：
```
sudo dpkg -i libseccomp2_2.4.3-1ubuntu3.16.04.3_amd64.deb
sudo dpkg -i containerd.io_1.2.13-2_amd64.deb
sudo dpkg -i docker-ce-cli_19.03.12_3-0_ubuntu-xenial_amd64.deb
sudo dpkg -i docker-ce_19.03.12_3-0_ubuntu-xenial_amd64.deb
```

#### 3、设置国内的docker registry地址：
```
sudo mkdir /etc/docker
sudo vim /etc/docker/daemon.json
输入以下内容并保存：
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
最后重启docker服务：
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### 4、运行hello-world镜像，测试安装是否成功：
```
sudo docker run hello-world
阿里云镜像加速器：

sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://ylfo3bxn.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
