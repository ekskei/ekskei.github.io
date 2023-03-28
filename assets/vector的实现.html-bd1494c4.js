import{_ as e,W as i,X as n,$ as s}from"./framework-b32ce0b5.js";const a={},d=s(`<h1 id="vector的实现" tabindex="-1"><a class="header-anchor" href="#vector的实现" aria-hidden="true">#</a> vector的实现</h1><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><p>C++标准库中的vector是一个动态数组，具有自动扩容的功能。它的实现原理可以分为以下几个方面：</p><ol><li><p>内存分配：vector使用new运算符来分配内存，同时在析构函数中使用delete[]运算符来释放内存。vector在内存空间不足时会自动扩容，扩容时会重新分配一块更大的内存空间，并将原有元素复制到新的内存空间中。</p></li><li><p>元素访问：vector支持随机访问，可以通过下标访问元素。vector内部使用一个指针来指向第一个元素的内存地址，通过指针加上下标的偏移量来访问指定元素的内存地址。</p></li><li><p>元素插入和删除：vector支持在末尾添加元素和删除末尾元素。在插入元素时，如果vector的内存空间不足，vector会自动扩容，并将新元素插入到末尾；在删除元素时，vector会调用元素的析构函数来销毁元素，并将size减1。</p></li><li><p>迭代器：vector支持迭代器，可以使用迭代器来遍历vector中的元素。vector的迭代器类型是指向元素的指针。</p></li><li><p>内存分配策略：为了提高vector的性能，C++标准库中的vector通常采用了一些内存分配策略，例如预分配内存空间、空间复用、指针交换等。这些策略可以减少内存分配和复制的次数，提高vector的效率。</p></li></ol><p>总的来说，C++ vector的实现原理基于动态数组，具有自动扩容的功能，并且使用一些优化策略来提高效率。</p><h2 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h2><p>下面是一个简化版的vector实现源码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>template&lt;typename T&gt;
class vector {
public:
    typedef T* iterator;

    vector() : data(nullptr), size(0), capacity(0) {}
    explicit vector(size_t n) : data(new T[n]), size(n), capacity(n) {}
    vector(const vector&amp; other) : data(new T[other.capacity]), size(other.size), capacity(other.capacity) {
        std::copy(other.begin(), other.end(), begin());
    }
    ~vector() { delete[] data; }

    vector&amp; operator=(const vector&amp; other) {
        if (this != &amp;other) {
            vector tmp(other);
            swap(tmp);
        }
        return *this;
    }

    void reserve(size_t new_capacity) {
        if (new_capacity &gt; capacity) {
            T* new_data = new T[new_capacity];
            std::copy(begin(), end(), new_data);
            delete[] data;
            data = new_data;
            capacity = new_capacity;
        }
    }

    void resize(size_t new_size) {
        reserve(new_size);
        for (size_t i = size; i &lt; new_size; ++i) {
            data[i] = T();
        }
        size = new_size;
    }

    void push_back(const T&amp; value) {
        if (size == capacity) {
            reserve(capacity == 0 ? 1 : capacity * 2);
        }
        data[size++] = value;
    }

    void pop_back() {
        --size;
        data[size].~T();
    }

    void clear() {
        for (size_t i = 0; i &lt; size; ++i) {
            data[i].~T();
        }
        size = 0;
    }

    bool empty() const { return size == 0; }
    size_t size() const { return size; }
    size_t capacity() const { return capacity; }
    T* begin() { return data; }
    T* end() { return data + size; }
    const T* begin() const { return data; }
    const T* end() const { return data + size; }

private:
    T* data;
    size_t size;
    size_t capacity;

    void swap(vector&amp; other) {
        std::swap(data, other.data);
        std::swap(size, other.size);
        std::swap(capacity, other.capacity);
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的实现中使用了模板类来定义vector，可以支持任意类型的元素。在vector的核心实现中使用了一个指针data来存储元素的内存地址，size表示当前元素数量，capacity表示当前vector分配的内存容量。具体实现中使用new运算符来分配内存，并且在析构函数中使用delete[]运算符来释放内存。</p><p>vector的实现中还包含了一些常用的成员函数，例如reserve、resize、push_back、pop_back和clear等，这些函数实现了vector的自动扩容和元素操作功能。</p><p>需要注意的是，以上是一个简化版的vector实现，实际上C++标准库中的vector实现相对复杂，包含了很多细节和优化。</p>`,11),v=[d];function c(l,r){return i(),n("div",null,v)}const u=e(a,[["render",c],["__file","vector的实现.html.vue"]]);export{u as default};
