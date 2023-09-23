
//https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
export const setWithExpiry = (key: string, value: any, ttl: number | undefined = 86400000) => {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
};

export const getWithExpiry = (key: string): any => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    //if expiry empty
    if (!item?.expiry) {
        localStorage.removeItem(key)
        return null
    }
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
};

export const removeWithExpiry = (key: string) => {
    // delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
};



