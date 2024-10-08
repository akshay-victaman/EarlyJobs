let languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Odia', label: 'Odia' }
];

let workTypeOptions = [
    {value: 'On Site', label: 'On Site - Employees come to work in-person'},
    {value: 'Hybrid', label: 'Hybrid - Employees work on-site and off-site'},
    {value: 'Remote', label: 'Remote - Employees work off-site'}
]

let categoryOptions = [
    'Aviation',
    'Banking',
    'Insurance',
    'Oil And Gas',
    'Retail',
    'Education',
    'Consumer Goods',
    'Manufacturing',
    'Information Technology',
    'Health Care',
    'BPO',
    'ITES',
    'Entertainment',
    'Finance',
    'Textile',
    'Media and news',
    'Food processing',
    'Hospitality',
    'Construction',
    'Law',
    'Advertising',
    'E-commerce',
    'Other'
]

let shiftTypeOptions = [
    'Day Shifts',
    'Night Shifts',
    'Evening Shifts',
    'Morning Shifts',
    'Rotating Shifts',
    'Split Shifts',
    'Flexi-shifts',
    'Weekend Shifts',
    'On-call Shifts',
    'Other'
]

let employmentTypeOptions = [
    'Permanent Employment (Full-time)',
    'Fixed-term Employment',
    'Contractual Employment',
    'Part-time Employment',
    'Temporary Employment',
    'Casual Employment',
    'Consultant/Independent Contractor',
    'Apprenticeship',
    'Internship',
    'Freelance',
]

const currencyOptions = [
    { value: '₹,INR', label: <div style={{display: 'flex', alignItems: 'center' }}>₹ - INR</div>},
    { value: '$,USD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - USD</div>},
    { value: 'Lek,ALL', label: <div style={{display: 'flex', alignItems: 'center' }}>Lek - ALL</div>},
    { value: '؋,AFN', label: <div style={{display: 'flex', alignItems: 'center' }}>؋ - AFN</div>},
    { value: '$,ARS', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - ARS</div>},
    { value: 'ƒ,AWG', label: <div style={{display: 'flex', alignItems: 'center' }}>ƒ - AWG</div>},
    { value: '$,AUD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - AUD</div>},
    { value: '₼,AZN', label: <div style={{display: 'flex', alignItems: 'center' }}>₼ - AZN</div>},
    { value: '$,BSD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - BSD</div>},
    { value: '$,BBD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - BBD</div>},
    { value: 'p.,BYR', label: <div style={{display: 'flex', alignItems: 'center' }}>p. - BYR</div>},
    { value: 'BZ$,BZD', label: <div style={{display: 'flex', alignItems: 'center' }}>BZ$ - BZD</div>},
    { value: '$,BMD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - BMD</div>},
    { value: '$b,BOB', label: <div style={{display: 'flex', alignItems: 'center' }}>$b - BOB</div>},
    { value: 'KM,BAM', label: <div style={{display: 'flex', alignItems: 'center' }}>KM - BAM</div>},
    { value: 'P,BWP', label: <div style={{display: 'flex', alignItems: 'center' }}>P - BWP</div>},
    { value: 'лв,BGN', label: <div style={{display: 'flex', alignItems: 'center' }}>лв - BGN</div>},
    { value: 'R$,BRL', label: <div style={{display: 'flex', alignItems: 'center' }}>R$ - BRL</div>},
    { value: '$,BND', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - BND</div>},
    { value: '៛,KHR', label: <div style={{display: 'flex', alignItems: 'center' }}>៛ - KHR</div>},
    { value: '$,CAD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - CAD</div>},
    { value: '$,KYD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - KYD</div>},
    { value: '$,CLP', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - CLP</div>},
    { value: '¥,CNY', label: <div style={{display: 'flex', alignItems: 'center' }}>¥ - CNY</div>},
    { value: '$,COP', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - COP</div>},
    { value: '₡,CRC', label: <div style={{display: 'flex', alignItems: 'center' }}>₡ - CRC</div>},
    { value: 'kn,HRK', label: <div style={{display: 'flex', alignItems: 'center' }}>kn - HRK</div>},
    { value: '₱,CUP', label: <div style={{display: 'flex', alignItems: 'center' }}>₱ - CUP</div>},
    { value: 'Kč,CZK', label: <div style={{display: 'flex', alignItems: 'center' }}>Kč - CZK</div>},
    { value: 'kr,DKK', label: <div style={{display: 'flex', alignItems: 'center' }}>kr - DKK</div>},
    { value: 'RD$,DOP', label: <div style={{display: 'flex', alignItems: 'center' }}>RD$ - DOP</div>},
    { value: '£,EGP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - EGP</div>},
    { value: '$,SVC', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - SVC</div>},
    { value: 'kr,EEK', label: <div style={{display: 'flex', alignItems: 'center' }}>kr - EEK</div>},
    { value: '€,EUR', label: <div style={{display: 'flex', alignItems: 'center' }}>€ - EUR</div>},
    { value: '£,FKP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - FKP</div>},
    { value: '$,FJD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - FJD</div>},
    { value: '₾,GEL', label: <div style={{display: 'flex', alignItems: 'center' }}>₾ - GEL</div>},
    { value: '¢,GHC', label: <div style={{display: 'flex', alignItems: 'center' }}>¢ - GHC</div>},
    { value: '£,GIP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - GIP</div>},
    { value: 'Q,GTQ', label: <div style={{display: 'flex', alignItems: 'center' }}>Q - GTQ</div>},
    { value: '£,GGP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - GGP</div>},
    { value: '$,GYD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - GYD</div>},
    { value: 'L,HNL', label: <div style={{display: 'flex', alignItems: 'center' }}>L - HNL</div>},
    { value: '$,HKD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - HKD</div>},
    { value: 'Ft,HUF', label: <div style={{display: 'flex', alignItems: 'center' }}>Ft - HUF</div>},
    { value: 'kr,ISK', label: <div style={{display: 'flex', alignItems: 'center' }}>kr - ISK</div>},
    { value: 'Rp,IDR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rp - IDR</div>},
    { value: '﷼,IRR', label: <div style={{display: 'flex', alignItems: 'center' }}>﷼ - IRR</div>},
    { value: '£,IMP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - IMP</div>},
    { value: '₪,ILS', label: <div style={{display: 'flex', alignItems: 'center' }}>₪ - ILS</div>},
    { value: 'J$,JMD', label: <div style={{display: 'flex', alignItems: 'center' }}>J$ - JMD</div>},
    { value: '¥,JYP', label: <div style={{display: 'flex', alignItems: 'center' }}>¥ - JYP</div>},
    { value: '£,JEP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - JEP</div>},
    { value: 'лв,KZT', label: <div style={{display: 'flex', alignItems: 'center' }}>лв - KZT</div>},
    { value: '₩,KPW', label: <div style={{display: 'flex', alignItems: 'center' }}>₩ - KPW</div>},
    { value: '₩,KRW', label: <div style={{display: 'flex', alignItems: 'center' }}>₩ - KRW</div>},
    { value: 'лв,KGS', label: <div style={{display: 'flex', alignItems: 'center' }}>лв - KGS</div>},
    { value: '₭,LAK', label: <div style={{display: 'flex', alignItems: 'center' }}>₭ - LAK</div>},
    { value: 'Ls,LVL', label: <div style={{display: 'flex', alignItems: 'center' }}>Ls - LVL</div>},
    { value: '£,LBP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - LBP</div>},
    { value: '$,LRD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - LRD</div>},
    { value: 'Lt,LTL', label: <div style={{display: 'flex', alignItems: 'center' }}>Lt - LTL</div>},
    { value: 'ден,MKD', label: <div style={{display: 'flex', alignItems: 'center' }}>ден - MKD</div>},
    { value: 'RM,MYR', label: <div style={{display: 'flex', alignItems: 'center' }}>RM - MYR</div>},
    { value: 'Rs,MUR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rs - MUR</div>},
    { value: '$,MXN', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - MXN</div>},
    { value: '₮,MNT', label: <div style={{display: 'flex', alignItems: 'center' }}>₮ - MNT</div>},
    { value: 'MT,MZN', label: <div style={{display: 'flex', alignItems: 'center' }}>MT - MZN</div>},
    { value: '$,NAD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - NAD</div>},
    { value: 'Rs,NPR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rs - NPR</div>},
    { value: 'ƒ,ANG', label: <div style={{display: 'flex', alignItems: 'center' }}>ƒ - ANG</div>},
    { value: '$,NZD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - NZD</div>},
    { value: 'C$,NIO', label: <div style={{display: 'flex', alignItems: 'center' }}>C$ - NIO</div>},
    { value: '₦,NGN', label: <div style={{display: 'flex', alignItems: 'center' }}>₦ - NGN</div>},
    { value: 'Kr,NOK', label: <div style={{display: 'flex', alignItems: 'center' }}>Kr - NOK</div>},
    { value: '﷼,OMR', label: <div style={{display: 'flex', alignItems: 'center' }}>﷼ - OMR</div>},
    { value: 'Rs,PKR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rs- PKR</div>},
    { value: 'B/.,PAB', label: <div style={{display: 'flex', alignItems: 'center' }}>B/. - PAB</div>},
    { value: 'Gs,PYG', label: <div style={{display: 'flex', alignItems: 'center' }}>Gs - PYG</div>},
    { value: 'S/.,PEN', label: <div style={{display: 'flex', alignItems: 'center' }}>S/. - PEN</div>},
    { value: '₱,PHP', label: <div style={{display: 'flex', alignItems: 'center' }}>₱ - PHP</div>},
    { value: 'zł,PLN', label: <div style={{display: 'flex', alignItems: 'center' }}>zł - PLN</div>},
    { value: '﷼,QAR', label: <div style={{display: 'flex', alignItems: 'center' }}>﷼ - QAR</div>},
    { value: 'lei,RON', label: <div style={{display: 'flex', alignItems: 'center' }}>lei - RON</div>},
    { value: '₽,RUB', label: <div style={{display: 'flex', alignItems: 'center' }}>₽ - RUB</div>},
    { value: '£,SHP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - SHP</div>},
    { value: '﷼,SAR', label: <div style={{display: 'flex', alignItems: 'center' }}>﷼ - SAR</div>},
    { value: 'Дин,RSD', label: <div style={{display: 'flex', alignItems: 'center' }}>Дин. - RSD</div>},
    { value: 'Rs,SCR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rs - SCR</div>},
    { value: '$,SGD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - SGD</div>},
    { value: '$,SBD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - SBD</div>},
    { value: 'S,SOS', label: <div style={{display: 'flex', alignItems: 'center' }}>S - SOS</div>},
    { value: 'R,ZAR', label: <div style={{display: 'flex', alignItems: 'center' }}>R - ZAR</div>},
    { value: 'Rs,LKR', label: <div style={{display: 'flex', alignItems: 'center' }}>Rs - LKR</div>},
    { value: 'kr,SEK', label: <div style={{display: 'flex', alignItems: 'center' }}>kr - SEK</div>},
    { value: 'CHF,CHF', label: <div style={{display: 'flex', alignItems: 'center' }}>CHF - CHF</div>},
    { value: '$,SRD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - SRD</div>},
    { value: '£,SYP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - SYP</div>},
    { value: 'NT$,TWD', label: <div style={{display: 'flex', alignItems: 'center' }}>NT$ - TWD</div>},
    { value: '฿,THB', label: <div style={{display: 'flex', alignItems: 'center' }}>฿ - THB</div>},
    { value: 'TT$,TTD', label: <div style={{display: 'flex', alignItems: 'center' }}>TT$ - TTD</div>},
    { value: '₺,TRL', label: <div style={{display: 'flex', alignItems: 'center' }}>₺ - TRL</div>},
    { value: '$,TVD', label: <div style={{display: 'flex', alignItems: 'center' }}>$ - TVD</div>},
    { value: '₴,UAH', label: <div style={{display: 'flex', alignItems: 'center' }}>₴ - UAH</div>},
    { value: '£,GBP', label: <div style={{display: 'flex', alignItems: 'center' }}>£ - GBP</div>},
    { value: '$U,UYU', label: <div style={{display: 'flex', alignItems: 'center' }}>$U - UYU</div>},
    { value: 'лв,UZS', label: <div style={{display: 'flex', alignItems: 'center' }}>лв - UZS</div>},
    { value: 'Bs,VEF', label: <div style={{display: 'flex', alignItems: 'center' }}>Bs - VEF</div>},
    { value: '₫,VND', label: <div style={{display: 'flex', alignItems: 'center' }}>₫ - VND</div>},
    { value: '﷼,YER', label: <div style={{display: 'flex', alignItems: 'center' }}>﷼ - YER</div>},
    { value: 'Z$,ZWD', label: <div style={{display: 'flex', alignItems: 'center' }}>Z$ - ZWD</div>},
];

export { languageOptions, workTypeOptions, categoryOptions, shiftTypeOptions, employmentTypeOptions, currencyOptions };