import sampleData from './sampleData'
const delay =(ms)=>{
    return new Promise(resolve=>setTimeout(resolve, ms))
}
export const fetchsampledate=()=>{
    return delay(1000).then(()=>{
        return Promise.resolve(sampleData)
    })
}