class MagicHour {
    constructor(name, time) {
        this.name = name
        this.time = time || null
    }
}

const TimeSheet = [
    new MagicHour("Yayn"),
    new MagicHour("Janor"),
    new MagicHour("Nasnia"),
    new MagicHour("Salla"),
    new MagicHour("Sadedalí"),
    new MagicHour("Thamur"),
    new MagicHour("Ourer"),
    new MagicHour("Thamie"),
    new MagicHour("Neron"),
    new MagicHour("Jayon"),
    new MagicHour("Abaí"),
    new MagicHour("Natalon"),

    new MagicHour("Beron"),
    new MagicHour("Barol"),
    new MagicHour("Thamí"),
    new MagicHour("Athir"),
    new MagicHour("Mathon"),
    new MagicHour("Rana"),
    new MagicHour("Netos"),
    new MagicHour("Tafrac"),
    new MagicHour("Sassur"),
    new MagicHour("Aglo"),
    new MagicHour("Calerna"),
    new MagicHour("Salam")
]


class MagicClock {
    
    constructor() {
        /* deep copy array by value */
        this.timeSheet = JSON.parse(JSON.stringify(TimeSheet))
        this.vars = {            
            sunrise_offset: null,
            sunset_offset: null,
            day_minutes: null,
            night_minutes: null,
            min_in_day_hour: null,
            min_in_night_hour: null
        }
    }

    sameDay(a, b) {
        return (
            (a.getFullYear() === b.getFullYear()) &&
            (a.getMonth() === b.getMonth()) &&
            (a.getDay() === b.getDay())
        )
    }

    addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000)    

    calculate(sunrise, sunset) {                
        if (!sunrise) throw Error('Sunrise is not specified')
        if (!sunset) throw Error('Sunset is not specified')
        if (!sunrise instanceof Date) throw Error('Sunrise is not a Date instance')
        if (!sunset instanceof Date) throw Error('Sunset is not a Date instance')
        if (!this.sameDay(sunrise, sunset)) throw Error('Times of different days may produce wrong results')
        
        this.vars.sunrise_offset = (sunrise.getHours() * 60) + sunrise.getMinutes()        
        this.vars.sunset_offset = (sunset.getHours() * 60) + sunset.getMinutes()
        this.vars.day_minutes = this.vars.sunset_offset - this.vars.sunrise_offset
        this.vars.night_minutes = (1440) - this.vars.day_minutes        
        this.vars.min_in_day_hour = (this.vars.day_minutes / 1440.0) * 120
        this.vars.min_in_night_hour = (this.vars.night_minutes / 1440.0) * 120
        this.timeSheet[0].time = new Date(sunrise.getFullYear(), sunrise.getMonth(), sunrise.getDate())        
        for (let i = 1; i < 24; i++) 
            this.timeSheet[i].time = this.addMinutes( 
                this.timeSheet[i-1].time, 
                i < 12 ? this.vars.min_in_day_hour : this.vars.min_in_night_hour
            )
        
        return this.timeSheet
    }
}



// let c = new MagicClock()
// let a = new Date(2022, 05, 16, 06, 0, 0, 0)
// let b = new Date(2022, 05, 16, 18, 0, 0, 0)

// console.table(c.calculate(a, b))
// console.table(c.vars)

