import { table_managers } from "common";
import dayjs from "dayjs";

export default async function test(){
    const providerTable = new table_managers.ProviderTableManager("dev", "v1", "us-east-1")

    let providerId = "b7b2a556-6552-4b98-9d11-e0b98cdc6a3c:emr"

    let patients = await providerTable.getObjectsByHashKeyAndSortKeyConditions({key: "provider", operator:"=", value:"6f9eaa1c-619f-49b6-8322-41b4752a11e4:patient"})

    let patientIds: string[] = []
    patients.slice(0, 100).forEach(obj => {
        patientIds.push(obj.auth)
    })

    console.log(patientIds.length)

    /////////////////////////////////////

    // console.log("Testing sequentially")

    // let emrObjects = []

    // let startTime = dayjs().valueOf()
    // console.log("startTime - ", startTime)

    // for(let id of patientIds) {
    //     let emr = await providerTable.getObjectsByHashKeyAndSortKeyConditions(
    //         {key: "auth", operator: "=", value: id},
    //         {key: "provider", operator: "=", value: providerId},
    //     )
    //     console.log(emr)

    //     emrObjects.push(emr)
    // }

    // console.log(emrObjects)

    // let endTime = dayjs().valueOf()
    // console.log("endTime - ", endTime)

    // let timeTaken = endTime - startTime

    // console.log("timeTaken = ", timeTaken)


    /////////////////////////////////////

    console.log("Testing parallelly")

    let promises = []

    let startTime = dayjs().valueOf()
    console.log("startTime - ", startTime)

    for(let id of patientIds) {
        promises.push(providerTable.getObjectsByHashKeyAndSortKeyConditions(
            {key: "auth", operator:"=", value: id},
            {key: "provider", operator:"=", value: providerId},
        ))
    }

    // let emrObjects = await providerTable.getObjectsByHashKeyAndSortKeyConditions(
    //     {key: "auth", operator:"=", value: patientIds[0]},
    //     {key: "provider", operator:"=", value: providerId}
    // )

    let emrObjects = await Promise.all(promises)

    console.log(emrObjects)

    let endTime = dayjs().valueOf()
    console.log("endTime - ", endTime)

    let timeTaken = endTime - startTime

    console.log("timeTaken = ", timeTaken)

    /////////////////////////////////////

}

test()


// 300 random patients

// Sequentially - 436680 ms ~ 437 sec ~ 7.3 mins 
// Parallelly - 3050 ms ~ 3 sec



// 29 dedicated patients

// Sequentially - 32210 ms ~ 32 sec
// Parallelly - 2336 ms ~ 2.3 sec
