const e=JSON.parse('{"key":"v-dd038726","path":"/docs/cpp%E7%AC%94%E8%AE%B0/CMake%E6%95%99%E7%A8%8B.html","title":"CMake教程","lang":"zh-CN","frontmatter":{"title":"CMake教程","icon":"edit","author":{"name":"ekskei","url":"https://github.com/ekskei"},"date":"2022-10-25T00:00:00.000Z","category":["C/C++"],"tag":["CMake"],"description":"CMake教程 CMake是一个跨平台的管理源代码构建的工具。最初CMake被设计为的Makefile的生成器，现在CMake也可以生成现代的构建系统，如Ninja以及Visual Studio和Xcode等IDE的项目文件。CMake被广泛用于C和C++语言，也可以用于构建其他语言的源代码。 CMakeLists.txt 文件的编写 CMakeLists.txt 是 CMake 的配置文件，用于定义项目的源代码、依赖项和构建选项。在编写 CMakeLists.txt 文件时，通常需要包括以下几个部分： CMake 最低版本要求","head":[["meta",{"property":"og:url","content":"https://codevk.com/docs/cpp%E7%AC%94%E8%AE%B0/CMake%E6%95%99%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"CODEVK"}],["meta",{"property":"og:title","content":"CMake教程"}],["meta",{"property":"og:description","content":"CMake教程 CMake是一个跨平台的管理源代码构建的工具。最初CMake被设计为的Makefile的生成器，现在CMake也可以生成现代的构建系统，如Ninja以及Visual Studio和Xcode等IDE的项目文件。CMake被广泛用于C和C++语言，也可以用于构建其他语言的源代码。 CMakeLists.txt 文件的编写 CMakeLists.txt 是 CMake 的配置文件，用于定义项目的源代码、依赖项和构建选项。在编写 CMakeLists.txt 文件时，通常需要包括以下几个部分： CMake 最低版本要求"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-29T13:25:02.000Z"}],["meta",{"property":"article:author","content":"ekskei"}],["meta",{"property":"article:tag","content":"CMake"}],["meta",{"property":"article:published_time","content":"2022-10-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-29T13:25:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CMake教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-10-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-29T13:25:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ekskei\\",\\"url\\":\\"https://github.com/ekskei\\"}]}"]]},"headers":[{"level":2,"title":"CMakeLists.txt 文件的编写","slug":"cmakelists-txt-文件的编写","link":"#cmakelists-txt-文件的编写","children":[{"level":3,"title":"CMake 最低版本要求","slug":"cmake-最低版本要求","link":"#cmake-最低版本要求","children":[]},{"level":3,"title":"项目名称和源代码","slug":"项目名称和源代码","link":"#项目名称和源代码","children":[]},{"level":3,"title":"依赖项","slug":"依赖项","link":"#依赖项","children":[]},{"level":3,"title":"构建选项","slug":"构建选项","link":"#构建选项","children":[]}]},{"level":2,"title":"项目配置和构建","slug":"项目配置和构建","link":"#项目配置和构建","children":[{"level":3,"title":"创建构建目录","slug":"创建构建目录","link":"#创建构建目录","children":[]},{"level":3,"title":"配置项目","slug":"配置项目","link":"#配置项目","children":[]},{"level":3,"title":"构建项目","slug":"构建项目","link":"#构建项目","children":[]},{"level":3,"title":"运行项目","slug":"运行项目","link":"#运行项目","children":[]}]},{"level":2,"title":"交叉编译","slug":"交叉编译","link":"#交叉编译","children":[{"level":3,"title":"设置交叉编译工具链","slug":"设置交叉编译工具链","link":"#设置交叉编译工具链","children":[]},{"level":3,"title":"设置交叉编译器的根路径","slug":"设置交叉编译器的根路径","link":"#设置交叉编译器的根路径","children":[]},{"level":3,"title":"传参数指定交叉编译工具链的.cmake文件","slug":"传参数指定交叉编译工具链的-cmake文件","link":"#传参数指定交叉编译工具链的-cmake文件","children":[]}]},{"level":2,"title":"经验总结","slug":"经验总结","link":"#经验总结","children":[{"level":3,"title":"使用变量","slug":"使用变量","link":"#使用变量","children":[]},{"level":3,"title":"使用 find_package","slug":"使用-find-package","link":"#使用-find-package","children":[]},{"level":3,"title":"使用 add_subdirectory","slug":"使用-add-subdirectory","link":"#使用-add-subdirectory","children":[]},{"level":3,"title":"使用 configure_file","slug":"使用-configure-file","link":"#使用-configure-file","children":[]},{"level":3,"title":"自定义构建规则","slug":"自定义构建规则","link":"#自定义构建规则","children":[]},{"level":3,"title":"获取文件夹名称","slug":"获取文件夹名称","link":"#获取文件夹名称","children":[]}]}],"git":{"createdTime":1680096302000,"updatedTime":1680096302000,"contributors":[{"name":"ekskei","email":"837866535@qq.com","commits":1}]},"readingTime":{"minutes":5.9,"words":1771},"filePathRelative":"docs/cpp笔记/CMake教程.md","localizedDate":"2022年10月25日","excerpt":"<h1> CMake教程</h1>\\n<p>CMake是一个跨平台的管理源代码构建的工具。最初CMake被设计为的Makefile的生成器，现在CMake也可以生成现代的构建系统，如Ninja以及Visual Studio和Xcode等IDE的项目文件。CMake被广泛用于C和C++语言，也可以用于构建其他语言的源代码。</p>\\n<h2> CMakeLists.txt 文件的编写</h2>\\n<p>CMakeLists.txt 是 CMake 的配置文件，用于定义项目的源代码、依赖项和构建选项。在编写 CMakeLists.txt 文件时，通常需要包括以下几个部分：</p>\\n<h3> CMake 最低版本要求</h3>","autoDesc":true}');export{e as data};
