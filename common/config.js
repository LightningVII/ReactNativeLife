const baseUrl = 'http://localhost:4000/'

export default {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    backup: {
        avatar: 'http://7xpwuf.com1.z0.glb.clouddn.com/WechatIMG13.jpeg'
    },
    qiniu: {
        video: 'http://video.iblack7.com/',
        thumb: 'http://video.iblack7.com/',
        avatar: 'http://o9spjqu1b.bkt.clouddn.com/',
        upload: 'http://upload.qiniu.com'
    },
    cloudinary: {
        cloud_name: 'whiteace',
        api_key: '442257941421842',
        base: 'http://res.cloudinary.com/whiteace',
        image: 'https://api.cloudinary.com/v1_1/gougou/image/upload',
        video: 'https://api.cloudinary.com/v1_1/gougou/video/upload',
        audio: 'https://api.cloudinary.com/v1_1/gougou/raw/upload',
    },
    api: {
        creations: baseUrl + 'api/creations',
        comment: baseUrl + 'api/comments',
        up: baseUrl + 'api/up',
        video: baseUrl + 'api/creations/video',
        audio: baseUrl + 'api/creations/audio',
        signup: baseUrl + 'api/user/signup',
        verify: baseUrl + 'api/user/verify',
        update: baseUrl + 'api/user/update',
        signature: baseUrl + 'api/signature'
    }
}