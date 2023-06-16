import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,d as r}from"./app-7919e1d2.js";const t={},d=r(`<h1 id="shared-ptr智能指针" tabindex="-1"><a class="header-anchor" href="#shared-ptr智能指针" aria-hidden="true">#</a> shared_ptr智能指针</h1><p>C++中的shared_ptr是一种智能指针，它是通过引用计数来管理动态内存的。shared_ptr的实现过程可以简单地概括为以下几个步骤：</p><ol><li><p>创建一个shared_ptr对象时，它会初始化一个引用计数，该计数初始化为1，并将指针指向动态内存。</p></li><li><p>当一个shared_ptr对象被复制时，它的引用计数会增加1。这是通过将新的shared_ptr对象的引用计数指向原始对象的引用计数来实现的。</p></li><li><p>当一个shared_ptr对象被销毁时，它的引用计数会减少1。如果引用计数变为0，则意味着没有任何shared_ptr对象引用该动态内存，此时会自动释放该动态内存。</p></li><li><p>当一个shared_ptr对象被赋值给另一个shared_ptr对象时，它们共享同一个引用计数。这是通过将两个shared_ptr对象的引用计数指向同一个对象来实现的。</p></li></ol><p>shared_ptr对象还提供了自定义删除器的功能，可以在释放动态内存时调用指定的删除器函数。</p><p>具体实现上，shared_ptr对象内部有一个指向控制块的指针，控制块包含了引用计数和指向动态内存的指针。每个shared_ptr对象都共享同一个控制块，通过引用计数来管理动态内存的生命周期。</p><p>shared_ptr的实现还使用了模板和模板特化的技术，使得它可以适用于不同类型的动态内存。此外，shared_ptr还采用了线程安全的引用计数实现，以保证多线程环境下的正确性。</p><p>下面是一个使用原子操作实现的线程安全的shared_ptr类的源码示例：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;atomic&gt;
#include &lt;iostream&gt;

template &lt;typename T&gt;
class SharedPtr {
public:
    SharedPtr() : ptr(nullptr), ref_count(new std::atomic&lt;int&gt;(1)) {}
    SharedPtr(T* p) : ptr(p), ref_count(new std::atomic&lt;int&gt;(1)) {}
    SharedPtr(const SharedPtr&lt;T&gt;&amp; other) : ptr(other.ptr), ref_count(other.ref_count) {
        if (ref_count) {
            ++(*ref_count);
        }
    }
    ~SharedPtr() {
        if (ref_count &amp;&amp; --(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
    }

    SharedPtr&lt;T&gt;&amp; operator=(const SharedPtr&lt;T&gt;&amp; other) {
        if (this != &amp;other) {
            if (ref_count &amp;&amp; --(*ref_count) == 0) {
                delete ptr;
                delete ref_count;
            }
            ptr = other.ptr;
            ref_count = other.ref_count;
            if (ref_count) {
                ++(*ref_count);
            }
        }
        return *this;
    }

    T* operator-&gt;() const { return ptr; }
    T&amp; operator*() const { return *ptr; }

    int use_count() const { return ref_count ? *ref_count : 0; }

private:
    T* ptr;
    std::atomic&lt;int&gt;* ref_count;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的实现中，我们使用了<code>std::atomic&lt;int&gt;</code>来定义引用计数，从而保证了线程安全。具体实现时，在shared_ptr的构造函数中，我们使用<code>new std::atomic&lt;int&gt;(1)</code>来创建一个初始值为1的<code>std::atomic&lt;int&gt;</code>对象，然后在拷贝构造函数、析构函数、赋值操作等中使用原子操作来更新引用计数。</p><p>需要注意的是，由于<code>std::atomic&lt;T&gt;</code>对象的构造和析构是线程安全的，因此我们可以在构造函数和析构函数中直接使用new和delete来分配和释放<code>std::atomic&lt;int&gt;</code>对象的内存，而不需要使用互斥锁或者其他线程安全的手段。</p><p>使用上述实现方式，我们可以在多线程环境下安全地使用shared_ptr，而不需要担心线程安全问题。</p>`,11),s=[d];function l(a,c){return n(),i("div",null,s)}const p=e(t,[["render",l],["__file","shared_ptr智能指针.html.vue"]]);export{p as default};
