import{_ as e,W as i,X as n,$ as l}from"./framework-b32ce0b5.js";const s={},d=l(`<h1 id="list的实现" tabindex="-1"><a class="header-anchor" href="#list的实现" aria-hidden="true">#</a> list的实现</h1><p>C++标准库中的list是一个双向链表，可以支持在任意位置插入和删除元素，并且具有快速的插入和删除效率。</p><h1 id="与vector的区别" tabindex="-1"><a class="header-anchor" href="#与vector的区别" aria-hidden="true">#</a> 与vector的区别</h1><p>与vector相比，list的主要区别在于：</p><ol><li><p>存储结构：vector采用连续的内存空间存储元素，而list采用链式结构存储元素。</p></li><li><p>随机访问：vector支持随机访问，可以通过下标访问元素；而list不支持随机访问，只能通过迭代器遍历元素。</p></li><li><p>插入和删除：vector在末尾插入和删除元素的效率很高，但在中间插入和删除元素时效率较低，因为需要移动其他元素；而list在任意位置插入和删除元素的效率都很高，因为只需要修改相邻节点的指针。</p></li><li><p>内存分配：vector在内存空间不足时会自动扩容，会重新分配一块更大的内存空间，并将原有元素复制到新的内存空间中；而list的内存分配是动态的，每次插入一个元素都会分配一块新的内存空间。</p></li></ol><h1 id="实现过程" tabindex="-1"><a class="header-anchor" href="#实现过程" aria-hidden="true">#</a> 实现过程</h1><p>下面详细说明C++ list的实现过程：</p><ol><li><p>定义节点结构体 list的节点结构体包含三个成员变量：数据、前驱指针和后继指针。在创建节点时，需要为数据、前驱指针和后继指针赋初值，通常使用默认构造函数或带参数的构造函数来实现。</p></li><li><p>定义迭代器类 list的迭代器类是一个指向节点的指针，可以通过指针的前移和后移来实现遍历。在创建迭代器时，需要指定指向的节点。</p></li><li><p>定义list类 list的类包含两个成员变量：头节点指针和尾节点指针。在创建list对象时，头节点和尾节点都是空节点，即指向null。</p></li><li><p>实现list的成员函数</p><p>(1) size()函数：遍历链表，统计元素个数。</p><p>(2) clear()函数：遍历链表，释放所有节点。</p><p>(3) push_front()函数：创建一个新节点，插入到头节点之后。</p><p>(4) push_back()函数：创建一个新节点，插入到尾节点之前。</p><p>(5) pop_front()函数：删除头节点之后的节点，并释放内存。</p><p>(6) pop_back()函数：删除尾节点之前的节点，并释放内存。</p><p>(7) insert()函数：在指定位置插入一个新节点。</p><p>(8) erase()函数：删除指定位置的节点，并释放内存。</p></li><li><p>实现list的赋值运算符 list的赋值运算符需要先清空原有的元素，然后将指定的list的元素复制到当前list中。</p></li></ol><h1 id="实现源码" tabindex="-1"><a class="header-anchor" href="#实现源码" aria-hidden="true">#</a> 实现源码</h1><p>下面是一个简化版的list实现源码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>template&lt;typename T&gt;
class list {
public:
    struct Node {
        T data;
        Node* prev;
        Node* next;
        Node(const T&amp; d = T(), Node* p = nullptr, Node* n = nullptr) : data(d), prev(p), next(n) {}
    };

    class iterator {
    public:
        iterator() : node(nullptr) {}
        explicit iterator(Node* n) : node(n) {}
        iterator&amp; operator++() { node = node-&gt;next; return *this; }
        iterator&amp; operator--() { node = node-&gt;prev; return *this; }
        T&amp; operator*() { return node-&gt;data; }
        Node* getNode() const { return node; }
        bool operator==(const iterator&amp; other) const { return node == other.node; }
        bool operator!=(const iterator&amp; other) const { return node != other.node; }
    private:
        Node* node;
    };

    list() : head(new Node()), tail(new Node()) {
        head-&gt;next = tail;
        tail-&gt;prev = head;
    }
    ~list() {
        clear();
        delete head;
        delete tail;
    }

    list(const list&amp; other) : list() {
        for (auto&amp; x : other) {
            push_back(x);
        }
    }
    list&amp; operator=(list other) {
        swap(other);
        return *this;
    }

    void push_front(const T&amp; value) { insert(begin(), value); }
    void push_back(const T&amp; value) { insert(end(), value); }
    void pop_front() { erase(begin()); }
    void pop_back() { erase(--end()); }

    iterator insert(iterator pos, const T&amp; value) {
        Node* p = pos.getNode();
        Node* new_node = new Node(value, p-&gt;prev, p);
        p-&gt;prev-&gt;next = new_node;
        p-&gt;prev = new_node;
        return iterator(new_node);
    }

    iterator erase(iterator pos) {
        Node* p = pos.getNode();
        iterator next(p-&gt;next);
        p-&gt;prev-&gt;next = p-&gt;next;
        p-&gt;next-&gt;prev = p-&gt;prev;
        delete p;
        return next;
    }

    void clear() {
        while (!empty()) {
            erase(begin());
        }
    }

    bool empty() const { return head-&gt;next == tail; }
    size_t size() const {
        size_t n = 0;
        for (auto it = begin(); it != end(); ++it) {
            ++n;
        }
        return n;
    }

    void swap(list&amp; other) {
        std::swap(head, other.head);
        std::swap(tail, other.tail);
    }

    iterator begin() const { return iterator(head-&gt;next); }
    iterator end() const { return iterator(tail); }

private:
    Node* head;
    Node* tail;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),r=[d];function a(t,v){return i(),n("div",null,r)}const o=e(s,[["render",a],["__file","list的实现.html.vue"]]);export{o as default};
