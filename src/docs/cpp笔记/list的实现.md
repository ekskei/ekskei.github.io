---
title: list的实现
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2019-03-02
category:
  - C/C++
tag:
  - STL
---

# list的实现

C++标准库中的list是一个双向链表，可以支持在任意位置插入和删除元素，并且具有快速的插入和删除效率。

# 与vector的区别

与vector相比，list的主要区别在于：

1. 存储结构：vector采用连续的内存空间存储元素，而list采用链式结构存储元素。

2. 随机访问：vector支持随机访问，可以通过下标访问元素；而list不支持随机访问，只能通过迭代器遍历元素。

3. 插入和删除：vector在末尾插入和删除元素的效率很高，但在中间插入和删除元素时效率较低，因为需要移动其他元素；而list在任意位置插入和删除元素的效率都很高，因为只需要修改相邻节点的指针。

4. 内存分配：vector在内存空间不足时会自动扩容，会重新分配一块更大的内存空间，并将原有元素复制到新的内存空间中；而list的内存分配是动态的，每次插入一个元素都会分配一块新的内存空间。

# 实现过程

下面详细说明C++ list的实现过程：

1. 定义节点结构体
list的节点结构体包含三个成员变量：数据、前驱指针和后继指针。在创建节点时，需要为数据、前驱指针和后继指针赋初值，通常使用默认构造函数或带参数的构造函数来实现。

2. 定义迭代器类
list的迭代器类是一个指向节点的指针，可以通过指针的前移和后移来实现遍历。在创建迭代器时，需要指定指向的节点。

3. 定义list类
list的类包含两个成员变量：头节点指针和尾节点指针。在创建list对象时，头节点和尾节点都是空节点，即指向null。

4. 实现list的成员函数

    (1) size()函数：遍历链表，统计元素个数。

    (2) clear()函数：遍历链表，释放所有节点。

    (3) push_front()函数：创建一个新节点，插入到头节点之后。

    (4) push_back()函数：创建一个新节点，插入到尾节点之前。

    (5) pop_front()函数：删除头节点之后的节点，并释放内存。

    (6) pop_back()函数：删除尾节点之前的节点，并释放内存。

    (7) insert()函数：在指定位置插入一个新节点。

    (8) erase()函数：删除指定位置的节点，并释放内存。

5. 实现list的赋值运算符
list的赋值运算符需要先清空原有的元素，然后将指定的list的元素复制到当前list中。

# 实现源码

下面是一个简化版的list实现源码：

```C++
template<typename T>
class list {
public:
    struct Node {
        T data;
        Node* prev;
        Node* next;
        Node(const T& d = T(), Node* p = nullptr, Node* n = nullptr) : data(d), prev(p), next(n) {}
    };

    class iterator {
    public:
        iterator() : node(nullptr) {}
        explicit iterator(Node* n) : node(n) {}
        iterator& operator++() { node = node->next; return *this; }
        iterator& operator--() { node = node->prev; return *this; }
        T& operator*() { return node->data; }
        Node* getNode() const { return node; }
        bool operator==(const iterator& other) const { return node == other.node; }
        bool operator!=(const iterator& other) const { return node != other.node; }
    private:
        Node* node;
    };

    list() : head(new Node()), tail(new Node()) {
        head->next = tail;
        tail->prev = head;
    }
    ~list() {
        clear();
        delete head;
        delete tail;
    }

    list(const list& other) : list() {
        for (auto& x : other) {
            push_back(x);
        }
    }
    list& operator=(list other) {
        swap(other);
        return *this;
    }

    void push_front(const T& value) { insert(begin(), value); }
    void push_back(const T& value) { insert(end(), value); }
    void pop_front() { erase(begin()); }
    void pop_back() { erase(--end()); }

    iterator insert(iterator pos, const T& value) {
        Node* p = pos.getNode();
        Node* new_node = new Node(value, p->prev, p);
        p->prev->next = new_node;
        p->prev = new_node;
        return iterator(new_node);
    }

    iterator erase(iterator pos) {
        Node* p = pos.getNode();
        iterator next(p->next);
        p->prev->next = p->next;
        p->next->prev = p->prev;
        delete p;
        return next;
    }

    void clear() {
        while (!empty()) {
            erase(begin());
        }
    }

    bool empty() const { return head->next == tail; }
    size_t size() const {
        size_t n = 0;
        for (auto it = begin(); it != end(); ++it) {
            ++n;
        }
        return n;
    }

    void swap(list& other) {
        std::swap(head, other.head);
        std::swap(tail, other.tail);
    }

    iterator begin() const { return iterator(head->next); }
    iterator end() const { return iterator(tail); }

private:
    Node* head;
    Node* tail;
};
```
