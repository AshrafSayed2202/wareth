import { useMemo } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale'; // Import Arabic locale
import moment from 'moment-hijri'; // Import moment-hijri directly
import { Timestamp } from 'firebase/firestore'; // Import Firestore Timestamp

const useArabicDateFormatter = (date, type) => {
    return useMemo(() => {
        const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

        // Convert Firestore Timestamp to Date
        const validDate = (date instanceof Timestamp) ? date.toDate() : new Date(date);

        // Check for valid date input
        if (isNaN(validDate)) return '';

        if (type === 'hijri') {
            const hijriDate = moment(validDate).format('iYYYY/iM/iD'); // Use format instead of iFormat
            const [year, month, day] = hijriDate.split('/');
            const dayOfWeek = arabicDays[moment(validDate).day()];

            return `${dayOfWeek} ${day} ${getHijriMonth(month)} ${year}هـ`;
        } else {
            const formattedDate = format(validDate, 'eeee dd MMMM yyyy', { locale: ar });
            return formattedDate.replace(/الإثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت|الأحد/, match => {
                return arabicDays[["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].indexOf(match)];
            }) + ' مـ';
        }
    }, [date, type]);
};

const getHijriMonth = (month) => {
    const hijriMonths = [
        'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
        'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'
    ];
    return hijriMonths[month - 1];
};

export default useArabicDateFormatter;
