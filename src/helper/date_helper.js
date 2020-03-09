import Moment from 'moment';

export default {
    formatDate(time) {
        return Moment.unix(time).format("YYYY-MM-DD hh:mm:ss");
    }
}