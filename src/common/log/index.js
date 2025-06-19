import moment from "moment";
import { SHOW_LOGS } from "../constants";

export const LOG = (type, title, message) => {
    if (
        SHOW_LOGS === 'YES'
    ) {
        switch (type) {
            case 'ERROR':
                console.log(`xxxxxxxxxxxxxxxxxxxxxxxxx ${type} BEGIN xxxxxxxxxxxxxxxxxxxxxxxxx`)
                console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
                console.log('____________________________________________________')

                if (
                    (title !== undefined || title !== null) &&
                    title.length > 0
                ) {
                    console.log(title)
                    console.log('____________________________________________________')
                }
                if ((message !== undefined || message !== null)) {
                    console.log(message)
                }
                console.log(`xxxxxxxxxxxxxxxxxxxxxxxx$ ${type} END $xxxxxxxxxxxxxxxxxxxxxxxx`)
                break;
            case 'INFO':
                console.log(`========================$ ${type} BEGIN $========================`)
                console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
                console.log('____________________________________________________')

                if (
                    (title !== undefined || title !== null) &&
                    title.length > 0
                ) {
                    console.log(title)
                    console.log('____________________________________________________')
                }
                if ((message !== undefined || message !== null)) {
                    console.log(message)
                }
                console.log(`========================$ ${type} END $========================`)
                break;
            case 'DEBUG':
                console.log(`########################$ ${type} BEGIN $########################`)
                console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
                console.log('____________________________________________________')

                if (
                    (title !== undefined || title !== null) &&
                    title.length > 0
                ) {
                    console.log(title)
                    console.log('____________________________________________________')
                }
                if ((message !== undefined || message !== null)) {
                    console.log(message)
                }
                console.log(`########################$ ${type} END $########################`)
                break;
            default:
                console.log(`########################$ LOG BEGIN $########################`)
                console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
                console.log('____________________________________________________')

                if (
                    (title !== undefined || title !== null) &&
                    title.length > 0
                ) {
                    console.log(title)
                    console.log('____________________________________________________')
                }
                if (
                    (message !== undefined || message !== null) &&
                    message.length > 0
                ) {
                    console.log(message)
                }
                console.log(`########################$ LOG END $########################`)
                console.log(message)
        }
    }
}