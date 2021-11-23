/* 定义一个字典项，<Key, Value> */
class Entry<T, K> {
    key: T;
    value: K;
    constructor(key: T, value: K) {
      this.key = key;
      this.value = value;
    }
  }
  
  /* 定义泛型字典，由名值对数组构成。Key不能重复，Value可以重复，但是重复的时候根据Value查找Key只能找到匹配的第一个 */
  export class Dictionary<T, K> {
    private _entries: Array<Entry<T, K>>;
  
    constructor() {
      this._entries = new Array<Entry<T, K>>();
    }
  
    get Entries() {
      return this._entries;
    }
  
    get Count(): number {
      return this._entries.length;
    }
  
    append(key: T, value: K) {
      if (this._entries.findIndex(entry => entry.key === key) < 0) {
        this._entries.push(new Entry(key, value));
      }
    }
  
    contains(key: T): boolean {
      if (this._entries.findIndex(entry => entry.key === key) < 0) {
        return true;
      }
      return false;
    }
  
    getValue(key: T): K | null {
      const entry = this._entries.find(entry => entry.key === key);
      if (entry) {
        return entry.value;
      }
      return null;
    }
  
    /* 根据值获取key，只查找第一个满足条件的 */
    getKey(value: K): T | null {
      const entry = this._entries.find(entry => entry.value === value);
      if (entry) {
        return entry.key;
      }
      return null;
    }
  
    remove(key: T) {
      const index = this._entries.findIndex(entry => entry.key === key);
      if (index >= 0) {
        this._entries.splice(index, 1);
      }
    }
  
    clear() {
      this._entries = new Array<Entry<T, K>>();
    }
  }
  