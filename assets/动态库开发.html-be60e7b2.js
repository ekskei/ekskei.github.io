import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as a,d as n}from"./app-18ea6252.js";const d={},l=n(`<h1 id="动态库开发" tabindex="-1"><a class="header-anchor" href="#动态库开发" aria-hidden="true">#</a> 动态库开发</h1><p>动态库是一种可以在程序运行时被动态加载的共享库，它包含了一组函数和数据，可以被多个程序共享使用，在C/C++代码重用和模块化开发中有着广泛的应用。动态库通常采用共享对象文件（.so）或者动态链接库文件（.dll）的格式存储在磁盘上。本文将介绍动态库的开发方法以及注意事项，帮助了解如何编写高质量的动态库。</p><h2 id="导出函数" tabindex="-1"><a class="header-anchor" href="#导出函数" aria-hidden="true">#</a> 导出函数</h2><p>编写要导出的函数时，需要使用特殊的关键字和修饰符来标识它们是动态库的导出函数。</p><p>例如，在Linux系统下，可以使用__attribute__((visibility(&quot;default&quot;)))修饰符来标识：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>__attribute__((visibility(&quot;default&quot;))) int add(int a, int b)
{
    return a + b;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Windows系统下，可以使用__declspec(dllexport)关键字来标识：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>__declspec(dllexport) int add(int a, int b)
{
    return a + b;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-extern-c" tabindex="-1"><a class="header-anchor" href="#使用-extern-c" aria-hidden="true">#</a> 使用 extern &quot;C&quot;</h2><p>对于C++写的动态库，还需要加上extern &quot;C&quot;，代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#ifdef __cplusplus
extern &quot;C&quot; {
#endif

int add(int a, int b) {
    return a + b;
}

#ifdef __cplusplus
}
#endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用extern &quot;C&quot;主要有两个作用：</p><ul><li><p>解决C++的函数名称重载问题。在C++中，同一个函数名可以对应多个不同的函数，这就是函数名称重载问题。而在动态库中，函数的名称通常会被记录在符号表中，如果不做处理，就会导致符号表中出现多个同名函数，从而导致链接错误。为避免同名，C++ 编译器会产生像 _add_int_int 之类的名字（不同的编译器可能生成的名字不同，但是都采用了相同的机制，生成的新名字称为 mangled name ）。使用extern &quot;C&quot;可以将函数的名称转换为C语言风格的名称，从而避免函数名称重载问题。</p></li><li><p>避免C++异常处理机制的影响。在C++中，异常处理机制是通过一系列特殊的函数和数据结构来实现的。而在C语言中并没有异常处理机制，因此在使用C++动态库时，如果不使用extern &quot;C&quot;修饰符，就可能会受到C++异常处理机制的影响，导致程序出现异常而无法正常运行。使用extern &quot;C&quot;可以将函数的调用惯例设置为C语言风格的调用惯例，避免受到C++异常处理机制的影响，从而使动态库更加稳定和可靠。</p></li></ul><p>例如，在C++动态库中定义一个函数，使用了C++的异常处理机制：</p><h2 id="编译源文件" tabindex="-1"><a class="header-anchor" href="#编译源文件" aria-hidden="true">#</a> 编译源文件</h2><p>在Linux系统下，可以使用以下命令将目标文件编译成动态库文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>g++ <span class="token parameter variable">-shared</span> <span class="token parameter variable">-fPIC</span> <span class="token parameter variable">-o</span> libmylib.so mylib.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，-shared选项表示生成动态库文件，-选项表示生成与位置无关代码，-o选项指定生成的动态库文件名，mylib.o是编译生成的目标文件。</p><h2 id="动态加载和编译时链接" tabindex="-1"><a class="header-anchor" href="#动态加载和编译时链接" aria-hidden="true">#</a> 动态加载和编译时链接</h2><p>动态加载和编译时链接动态库的区别主要在于时机和方式的不同:</p><ul><li><p>动态加载是在运行时进行的，它需要使用特定的系统调用或语言 API 去查找、装入并绑定指定的动态库，更加灵活，但是装入过程需要耗费一定的时间和资源，并且绑定失败也有一定几率。</p></li><li><p>静态链接是在编译时进行的，需要在编译器链入所需的动态库，更加高效，但缺少运行时灵活性和动态调整能力。</p></li></ul><p>在实际应用中，通常会灵活结合这两种方式：静态地预先连接常用的基本库，以提高效率；动态地连接其它额外需要的动态扩展库或插件，以增强灵活性。</p><h2 id="链接动态库" tabindex="-1"><a class="header-anchor" href="#链接动态库" aria-hidden="true">#</a> 链接动态库</h2><p>在Linux系统下，可以使用以下命令将动态库文件链接到程序中：</p><p>g++ -o myapp main.o -L. -lmylib</p><p>其中，-L选项指定动态库文件的路径，-l选项指定动态库文件的名称，myapp是生成的可执行文件名，main.o是程序的入口文件。</p><h2 id="使用动态库" tabindex="-1"><a class="header-anchor" href="#使用动态库" aria-hidden="true">#</a> 使用动态库</h2><p>在Linux系统下，可以使用以下函数来动态加载和卸载动态库：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>#include &lt;dlfcn.h&gt;

void* handle = dlopen(&quot;./libmylib.so&quot;, RTLD_LAZY);
if (handle == NULL) {
    // 动态库加载失败
}

int (*add)(int, int) = (int (*)(int, int))dlsym(handle, &quot;add&quot;);
if (add == NULL) {
    // 导出函数获取失败
}

int result = add(1, 2);

int ret = dlclose(handle);
if (ret != 0) {
    // 动态库卸载失败
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，dlopen函数用来加载动态库文件，返回一个句柄，如果加载失败则返回NULL。dlsym函数用来获取动态库文件中导出的函数和数据，返回一个指针，如果获取失败则返回NULL。dlclose函数用来卸载动态库文件，返回0表示成功，否则表示失败。</p><p>在Windows系统下，可以使用以下函数来动态加载和卸载动态库：</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>#include &lt;windows.h&gt;

HINSTANCE handle = LoadLibraryA(&quot;mylib.dll&quot;);
if (handle == NULL) {
    // 动态库加载失败
}

typedef int (*AddFunc)(int, int);
AddFunc add = (AddFunc)GetProcAddress(handle, &quot;add&quot;);
if (add == NULL) {
    // 导出函数获取失败
}

int result = add(1, 2);

BOOL ret = FreeLibrary(handle);
if (ret == FALSE) {
    // 动态库卸载失败
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，LoadLibraryA函数用来加载动态库文件，返回一个句柄，如果加载失败则返回NULL。GetProcAddress函数用来获取动态库文件中导出的函数和数据，返回一个指针，如果获取失败则返回NULL。FreeLibrary函数用来卸载动态库文件，返回非0表示成功，否则表示失败。</p><h2 id="动态库路径规范" tabindex="-1"><a class="header-anchor" href="#动态库路径规范" aria-hidden="true">#</a> 动态库路径规范</h2><p>Linux系统中的动态库路径规范如下：</p><ol><li>系统级动态库存放在/lib和/usr/lib目录下。</li><li>应用程序级动态库存放在/usr/local/lib目录下。</li><li>动态库文件的命名应该遵循一定的规则，包括前缀、版本号和扩展名，具体规则如下： <ul><li>动态库文件的前缀应该为&quot;lib&quot;。</li><li>动态库文件的版本号应该采用&quot;主版本号.次版本号.发布号&quot;的格式，例如libmylib.so.1.2.3。</li><li>动态库文件的扩展名应该为&quot;.so&quot;。</li></ul></li></ol><h3 id="编译链接时指定动态库路径" tabindex="-1"><a class="header-anchor" href="#编译链接时指定动态库路径" aria-hidden="true">#</a> 编译链接时指定动态库路径</h3><p>在编译和链接动态库时，可以使用以下方法指定动态库的路径：</p><ol><li><p>使用编译器的-L选项</p><p>可以使用编译器的-L选项指定动态库的搜索路径，例如：</p><p>gcc -o myprogram myprogram.c -L/path/to/mylib -lmylib</p><p>其中，-L选项指定了动态库的搜索路径，-l选项指定了要链接的动态库名称。在这个例子中，编译器将在/path/to/mylib目录下搜索名为libmylib.so的动态库文件。</p></li><li><p>使用环境变量LD_LIBRARY_PATH</p><p>可以使用环境变量LD_LIBRARY_PATH指定动态库的搜索路径，例如：</p><p>export LD_LIBRARY_PATH=/path/to/mylib:$LD_LIBRARY_PATH</p><p>./myprogram</p><p>其中，LD_LIBRARY_PATH环境变量指定了动态库的搜索路径。在这个例子中，执行myprogram时，操作系统将在/path/to/mylib目录下搜索动态库文件。</p><p>需要注意的是，LD_LIBRARY_PATH环境变量可能会影响系统的安全性和稳定性，因此建议尽量不要使用它来指定动态库的路径。</p></li></ol><h3 id="使用-rpath参数" tabindex="-1"><a class="header-anchor" href="#使用-rpath参数" aria-hidden="true">#</a> 使用-rpath参数</h3><p>使用-rpath参数也可以指定动态库的路径。-rpath参数是用于指定运行时动态库搜索路径的选项，它会将指定的路径添加到可执行程序的运行时搜索路径中，以便在程序运行时能够正确地加载动态库。</p><p>例如：</p><p>gcc -o myprogram myprogram.c -L/path/to/mylib -Wl,-rpath=/path/to/mylib -lmylib</p><p>其中，-Wl,-rpath=/path/to/mylib选项指定了运行时动态库搜索路径。在这个例子中，编译器将在/path/to/mylib目录下搜索名为libmylib.so的动态库文件，并将该目录添加到可执行程序的运行时搜索路径中。</p><p>需要注意的是，使用-rpath参数可能会引起安全和稳定性问题，因此建议尽量避免使用它，除非确实需要在非标准路径下搜索动态库文件，并且能够保证动态库文件的安全性和稳定性。如果可能的话，应该使用其他更安全和可靠的方法来指定动态库的路径。</p><h2 id="使用cmake构建动态库" tabindex="-1"><a class="header-anchor" href="#使用cmake构建动态库" aria-hidden="true">#</a> 使用CMake构建动态库</h2><p>使用CMake构建动态库的步骤如下：</p><p>在CMakeLists.txt文件中，添加动态库的目标，并指定源文件：</p><p>add_library(mylib SHARED mylib.cpp)</p><p>这里使用add_library命令创建一个名为mylib的动态库，并指定源文件为mylib.cpp。</p><p>在CMakeLists.txt文件中，指定动态库的输出路径和名称：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>set_target_properties(mylib PROPERTIES
  LIBRARY_OUTPUT_DIRECTORY \${CMAKE_BINARY_DIR}/lib
  LIBRARY_OUTPUT_NAME mylib
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用set_target_properties命令设置动态库的输出路径为\${CMAKE_BINARY_DIR}/lib，输出文件名为mylib。</p><h2 id="使用cmake链接动态库" tabindex="-1"><a class="header-anchor" href="#使用cmake链接动态库" aria-hidden="true">#</a> 使用CMake链接动态库</h2><p>在CMake中链接动态库的方法如下：</p><p>在CMakeLists.txt文件中，使用find_library命令查找动态库：</p><p>find_library(MYLIB mylib PATHS \${CMAKE_BINARY_DIR}/lib)</p><p>这里使用find_library命令查找名为mylib的动态库，搜索路径为\${CMAKE_BINARY_DIR}/lib。</p><p>在CMakeLists.txt文件中，将动态库链接到目标文件：</p><p>target_link_libraries(myapp \${MYLIB})</p><p>这里使用target_link_libraries命令将动态库链接到名为myapp的目标文件。</p><h2 id="相关技巧" tabindex="-1"><a class="header-anchor" href="#相关技巧" aria-hidden="true">#</a> 相关技巧</h2><h3 id="查看版本号" tabindex="-1"><a class="header-anchor" href="#查看版本号" aria-hidden="true">#</a> 查看版本号</h3><p>在Linux系统中，有些动态库的版本号没有写在文件名中，由于文件名很容易被改动，文件名中的版本号也不一定是真的，真的版本号是在动态库文件内的SONAME里面，可通过以下两种命令查看：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>readelf <span class="token parameter variable">-d</span> libmylib.so
objdump <span class="token parameter variable">-p</span> libmylib.so <span class="token operator">|</span> <span class="token function">grep</span> SONAME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看被依赖项" tabindex="-1"><a class="header-anchor" href="#查看被依赖项" aria-hidden="true">#</a> 查看被依赖项</h3><p>ldd是一个Linux命令，它用于查看一个二进制可执行文件或共享库所依赖的动态链接库（也称为共享对象）的列表。ldd命令可以帮助用户诊断软件运行时出现的问题，例如缺少某些动态链接库、动态链接库版本不兼容等问题。</p><p>ldd如果加上-r参数，ldd命令将会显示动态链接库的重定位信息，包括重定位表的地址、符号名称、类型等信息，可以得知动态链接库中是否存在未解决的符号引用或符号冲突等问题。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ldd <span class="token parameter variable">-r</span> myapp
ldd <span class="token parameter variable">-r</span> libmylib.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,69),s=[l];function r(t,p){return e(),a("div",null,s)}const b=i(d,[["render",r],["__file","动态库开发.html.vue"]]);export{b as default};
