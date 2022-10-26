import { Editor, Transforms } from 'slate'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'

export const insertImage = (editor: Editor, url: string | ArrayBuffer | null) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

export const isImageUrl = (url: string) => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext as string)
}

export const withImages = (editor: any) => {
    const { insertData, isVoid } = editor

    editor.isVoid = (element: any) => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = (data: any) => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            files.forEach((file: any) => {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })
                    reader.readAsDataURL(file)
                }
            })
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}
