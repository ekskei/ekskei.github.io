---
title: CMake教程
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2022-10-25
category:
  - C/C++
tag:
  - CMake
---

# CMake教程

CMake是一个跨平台的管理源代码构建的工具。最初CMake被设计为的Makefile的生成器，现在CMake也可以生成现代的构建系统，如Ninja以及Visual Studio和Xcode等IDE的项目文件。CMake被广泛用于C和C++语言，也可以用于构建其他语言的源代码。

## CMakeLists.txt 文件的编写

CMakeLists.txt 是 CMake 的配置文件，用于定义项目的源代码、依赖项和构建选项。在编写 CMakeLists.txt 文件时，通常需要包括以下几个部分：

### CMake 最低版本要求

在 CMakeLists.txt 文件的开头，需要指定 CMake 的最低版本要求。这可以通过 cmake_minimum_required 命令来实现，例如：

cmake_minimum_required(VERSION 3.10)

### 项目名称和源代码

接下来，需要指定项目的名称和源代码。这可以通过 project 和 add_executable 命令来实现，例如：

project(MyProject)

add_executable(my_exe main.cpp)

在这个例子中，我们指定了项目名称为 MyProject，将 main.cpp 文件添加到源代码中，并将生成的可执行文件命名为 my_exe。

### 依赖项

如果项目依赖于其他库或框架，需要在 CMakeLists.txt 文件中指定这些依赖项。这可以通过 find_package 命令和 target_link_libraries 命令来实现。例如，如果项目依赖于 Boost 库，可以使用以下命令：

find_package(Boost REQUIRED)

target_link_libraries(my_exe Boost::boost)

### 构建选项

最后，需要指定构建选项，例如编译器选项、链接器选项、目标平台等。这可以通过 add_compile_options 命令和 set 命令来实现。

例如，如果要使用 C++11 标准编译源代码，可以使用以下命令：

add_compile_options(-std=c++11)

在编译时启用警告信息可以帮助发现代码中的潜在问题，例如：

add_compile_options(-Wall)

这样可以启用所有警告信息，也可以根据需要启用特定的警告选项。

## 项目配置和构建

在编写完 CMakeLists.txt 文件后，就可以进行项目配置和构建了。

下面是基本的项目配置和构建步骤：

### 创建构建目录

首先，需要创建一个新的目录，用于构建项目。建议将该目录与源代码目录分开，并将其命名为 build，例如：

mkdir build

cd build

### 配置项目

接下来，需要在构建目录中运行 CMake，以配置项目。可以使用以下命令：

cmake /path/to/source

其中，/path/to/source 是源代码目录的路径，一般就是上一层目录 .. 。

在配置项目时，可以指定一些选项，例如构建类型、目标平台等。这些选项可以通过 -D 参数传递给 CMake，例如：

cmake -DCMAKE_BUILD_TYPE=Release /path/to/source
这个命令将指定构建类型为 Release。

### 构建项目

配置完成后，就可以构建项目了。

可以使用以下命令：

cmake --build .

这个命令将使用默认的构建工具来构建项目。如果要使用特定的构建工具，可以使用 -G 参数，例如：

cmake -G "Unix Makefiles" --build .

这个命令将使用 Make 构建工具来构建项目，此时也可以直接运行 make 。

### 运行项目

构建完成后，就可以运行生成的可执行文件了。如果使用默认的名称和路径，可以使用以下命令：

./my_exe

如果生成的可执行文件位于其他目录中，需要指定其完整路径，例如：

/path/to/build/my_exe

## 交叉编译

CMake 支持交叉编译，可以在本地主机上构建针对嵌入式设备的代码。以下是几种不同的配置交叉编译的方法：

### 设置交叉编译工具链

在 CMakeLists.txt 文件中，使用 set 命令设置交叉编译工具链，例如：

```txt
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)
set(CMAKE_C_COMPILER /path/to/arm-linux-gcc)
set(CMAKE_CXX_COMPILER /path/to/arm-linux-g++)
```

这里将系统名称设置为 Linux，处理器设置为 arm，C 编译器和 C++ 编译器设置为 arm-linux-gcc 和 arm-linux-g++，这些设置应根据实际情况进行修改。

可以将以上设置的内容保存到 arm-linux.cmake 文件中，然后在 CMakeLists.txt 中包含进去，例如:

include(/path/to/arm-linux.cmake)

### 设置交叉编译器的根路径

在 CMakeLists.txt 文件中，使用 set 命令设置交叉编译器的根路径，例如：

```txt
set(CMAKE_FIND_ROOT_PATH /path/to/toolchain/)
set(CMAKE_SYSROOT /path/to/sysroot/)
```

这里将交叉编译器根路径设置为 /path/to/toolchain/，系统根目录设置为 /path/to/sysroot/，这些路径应根据实际情况进行修改。

### 传参数指定交叉编译工具链的.cmake文件

使用 -DCMAKE_TOOLCHAIN_FILE 选项指定交叉编译工具链的路径，例如：

cmake -DCMAKE_TOOLCHAIN_FILE=/path/to/arm-linux.cmake ..

这里将交叉编译工具链的路径设置为 /path/to/arm-linux.cmake，这样 CMake 就可以使用交叉编译工具链来生成针对嵌入式设备的代码。

## 经验总结

### 使用变量

使用变量可以使 CMakeLists.txt 文件更加简洁和易读，并且可以方便地修改编译选项和路径等常量。例如：

```txt
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
set(SOURCE_FILES main.cpp)
add_executable(my_exe ${SOURCE_FILES})
```

CMake 提供了许多内置变量来自定义构建过程，例如：

CMAKE_BUILD_TYPE：指定构建类型，可选值包括：

- Debug：用于在没有优化的情况下，使用带有调试符号构建库或可执行文件
- Release：用于构建的优化的库或可执行文件，不包含调试符号
- RelWithDebInfo：由于构建较少的优化库或可执行文件，包含调试符号
- MinSizeRel：用于不增加目标代码大小的优化方式，来构建或可执行文件

CMAKE_INSTALL_PREFIX：指定安装目录的路径。

CMAKE_CXX_COMPILER：指定 C++ 编译器的路径。

使用这些变量可以方便地定制构建过程，以满足特定的需求。

### 使用 find_package

使用 find_package 命令可以方便地查找和配置依赖项，例如：

```txt
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})
target_link_libraries(my_exe ${OpenCV_LIBS})
```

这样可以方便地使用 OpenCV 库，而不需要手动指定头文件和库文件路径。

### 使用 add_subdirectory

实际项目中，通常会有多个模块，每个模块相当于一个子项目，使用 add_subdirectory 命令可以方便地构建子项目，例如：

add_subdirectory(my_lib)

target_link_libraries(my_exe my_lib)

这样可以方便地使用 my_lib 子项目，并将它链接到 my_exe 可执行文件中。

### 使用 configure_file

使用 configure_file 命令可以方便地生成配置文件，例如：

```txt
set (VERSION_MAJOR 1)
set (VERSION_MINOR 0)
set (SOFT_VERSION V${VERSION_MAJOR}.${VERSION_MINOR})

configure_file(config.h.in config.h)
include_directories(${CMAKE_CURRENT_BINARY_DIR})
```

这样可以在生成过程中自动生成 config.h 文件，并将其包含在项目中。

config.h.in内容如下：

```C
#ifndef CONFIG_H_IN
#define CONFIG_H_IN

/**
* 可配置版本号、日期等信息
*/

#define VERSION_MAJOR @VERSION_MAJOR@
#define VERSION_MINOR @VERSION_MINOR@
#define SOFT_VERSION @SOFT_VERSION@

#endif

```

### 自定义构建规则

使用 add_custom_command 和 add_custom_target 命令可以方便地添加自定义构建规则，例如：

```txt
add_custom_command(
  OUTPUT my_output.txt
  COMMAND my_command arg1 arg2 > my_output.txt
  DEPENDS my_input.txt
)

add_custom_target(my_target DEPENDS my_output.txt)
```

这样可以在编译过程中执行自定义命令，并生成指定的输出文件。

### 获取文件夹名称

get_filename_component(CURRENT_FOLDER ${CMAKE_CURRENT_SOURCE_DIR} NAME)
