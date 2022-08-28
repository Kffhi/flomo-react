/**
 * hooks到底该怎么用...
 */

class TagSelect {
    private show: boolean

    constructor() {
        this.show = false
        // this.tag = null
    }

    isShow() {
        return this.show
    }

    // getTag() {
    //     return this.tag
    // }

    setVisibility(value: boolean) {
        this.show = value
    }

    // useTagSelect(data) {
    //     this.tag = data
    // }
}

const useTagSelect = new TagSelect()

export default useTagSelect
