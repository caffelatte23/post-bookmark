const KEY: string = "post-bookmark-url"

// ストレージの基底クラス
class MyStorage {
  key: string;

  constructor(key: string = "") {
    this.key = key
  }

  async get(): Promise<string> {
    return ""
  }

  async set(value: string): Promise<void> {
    return
  }
}

// Localで使用するためのストレージクラス
class LocalStorage extends MyStorage {
  async get(): Promise<string> {
    const result = await localStorage.getItem(this.key)
    return result ?? ""
  }

  async set(value: string): Promise<void> {
    return await localStorage.setItem(this.key, value)
  }
}

// Chrome内で使用するstorageクラス
class ChromeStorage extends MyStorage {
  async get(): Promise<string> {
    const result = await chrome.storage.local.get(this.key);
    return result[this.key] ?? ""
  }

  async set(value: string): Promise<void> {
    const props = Object()
    props[this.key] = value
    return await chrome.storage.local.set(props)
  }
}

const storage = import.meta.env.DEV ? new LocalStorage(KEY) : new ChromeStorage(KEY)
export default storage;