const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGZPp2sGRnygud2-Su912e1K5sUnWAxLLM_MafCkRa2fhznljw_2Tzbgnjkk-katHHb3iiNvgAg0eQhb8fBAvuk",
    "privateKey": "p4ibPCAiuBIKGkKaf-hW4_Tlh0UbKcKmewy1xhYg1cw"
};
 
 
webPush.setVapidDetails(
    'mailto:yondeveloper@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eoSgo5AbSFY:APA91bFEUIBg2xrBrULcwa4Ex8_j_4WoiiVOmUajSlMCBPXydF06mafpgNTfLpLCzNQRiPjTz1UPs2G1wdWiQdRYO0Hsf2nzMbDIeBt5aQK99xvPltnSxO8x2BHIifC6LFSy1557vmh-",
    "keys": {
        "p256dh": "BE3OGzPB5kzA8M3eoARyTPejC6G5DuJ3jlP92/6v3Bv7w5dnInZe8+h+YGZgwTxUY0V9rflgtLigTbg/aJOmibE=",
        "auth": "PdsvLRLzSpbs0CBouy4Wlw=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
const options = {
    gcmAPIKey: '932187104608',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);