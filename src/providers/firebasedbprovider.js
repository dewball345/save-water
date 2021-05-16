import {db} from './firebase.js';
import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {FBAuthContext} from './firebaseauthprovider';
import * as CryptoJS from 'crypto-js';
import * as i from 'idb-keyval'




//UNDO HERE: 4/11/21 encryption
export const DBContext = createContext();

//UNDOUNDO
//Undo here - 4/6/21
export default function FirebaseDBProvider({children}){
    //Undo here - 3/15/21
    let auth = useContext(FBAuthContext);
    // console.log(auth.currentUser.uid)
    const [userId, changeUID] = useState();
    const [reload, changeReload] = useState();
    const [multiplier, changeMultiplier] = useState({
        value: 0.000264,
        label: " g"
    })
    const options = [
        {
            value: 1/1000,
            label: " L"
        },
        {
            value: 0.000264,
            label: " g"
        },
        {value: 1, label: " mL"}
    ]
    // const [logout, changeLogout] = useState(false);
    // const storage = window.localStorage;
    

    function encrypt(jsonString){
 
        // Encrypt
        let ciphertext = CryptoJS.AES.encrypt(jsonString, auth.currentUser.uid).toString();
        return ciphertext;

    }

    function decrypt(encryptstring){
        // console.log("entered the decryption function")
        // console.log(auth.currentUser.uid)
        // Decrypt
        let bytes  = CryptoJS.AES.decrypt(encryptstring, auth.currentUser.uid);
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
         
        return decryptedData;
    }

    const [stateMap, changeStateMap] = useState({
        data: {},
        start: false
    })

    const getUserData = useCallback(async function getUserData(dir){
        // console.log("ENTERED USECALLBACK")
        // console.log(userId + "/" + dir)
        // console.log("entered usecallback")
        let data = await db.ref(userId + "/" + dir).get()
        return data.val();
    }, [userId]);

    async function clear(){
        await i.del('local-user-data')
        // storage.clear()
        // console.log("STARTING CHANGE LOGOUT")
        // changeLogout(true)
        // console.log("CHANGED LOGOUT TO TRUE")
    }
    async function syncData(){
        await clear()
        changeStateMap({
            data: {},
            start: false
        })
        thingFunc()
    }

    function thingFunc(){
        // console.log("entered useEffect")
        async function getData(){
            let data;
            try{
                data = await getUserData('/')
            } catch(error){
                console.log("failure. if it is just a logout function, don't worry")
                console.log(error)
                return;
            }
            // console.log("USERID")
            // console.log(userId)
            // console.log(data)
            
            if(auth.currentUser !== undefined){
                if(data !== null){
                    await i.set('local-user-data', encrypt(JSON.stringify(data)))

                    changeStateMap({
                        data: data,
                        start: true
                    });
                } else {
                    await i.set('local-user-data', encrypt(JSON.stringify({})))
                }
            }
            // console.log("executed here")
        }
        
        
        //REPLACE
        // i.get('local-user-data')

        // console.log(stateMap)
        async function secondPart(){
            // console.log(i.get('local-user-data'))
            let storageItems = await i.get('local-user-data');
            // console.log(raw)
           
            
            // const storageItems = JSON.parse(get)
            // console.log(storageItems)
            // console.log(stateMap.start)

            if(!stateMap.start){
                console.log("entered")
                if(storageItems === null || storageItems === undefined){
                    // console.log("get request to firebase")
                    await getData()
                } else {
                    // console.log("here(i'm doing the decryption!)")
                    
                    // console.log("START:" + stateMap.start)
                    if(auth.currentUser !== undefined){
                        storageItems = decrypt(storageItems)
                        changeStateMap({data: storageItems, start:true})
                    }
                }
                
            }
        }

        secondPart()

    }

    useEffect(thingFunc, [stateMap.start, getUserData])

    if(auth.currentUser !== undefined && auth.currentUser !== null){
        if(userId === undefined){
            changeUID(auth.currentUser.uid);
        }
        
        // console.log("SET USERID" + userId)
    }

    async function deleteUserData(dir){
        let dirs = dir.split("/");

        let op = "delete map"
        dirs.forEach((dir) => {
          op += "[" + '"' + dir + '"' + "]"
        })

        let operation = new Function("map", op)
        operation(stateMap.data)

        changeStateMap({data: stateMap["data"], start:stateMap['start']})
        await i.set('local-user-data', encrypt(JSON.stringify(stateMap['data'])))

        await db.ref(userId + "/" + dir).remove();
    }

    async function writeUserData(dir, data) {

        let dirs = dir.split('/');
        if(dirs.length > 1){
          let last = dirs[dirs.length - 1]
          let dirList = dirs.slice(0, -1)
          let accessor;
          dirList.forEach(element => {
              if(accessor === undefined || accessor === null) {
                  if(stateMap.data[element] === undefined){
                      stateMap.data[element] = {}
                  } 
                  accessor = stateMap.data[element]
              } else if(accessor[element] === undefined){
                  accessor[element] = {}
                  accessor = accessor[element]
              } else {
                  accessor = accessor[element]
    
              }
            //   console.log(accessor)
          });
          accessor[last] = data;
        } else {
          stateMap.data[dirs[0]] = data
        }

        // let dirs = dir.split('/')
        // let last = dirs[dirs.length - 1]
        // let dirList = dirs.slice(0, -1)
        // let accessor;
        // dirList.forEach(element => {
        //     if(accessor === undefined || accessor === null) {
        //         console.log("STATEMAP: " + stateMap.data)
        //         if(stateMap.data[element] === undefined){
        //             stateMap.data[element] = {}
        //         } 
        //         accessor = stateMap.data[element]


        //     } else {
        //         accessor = accessor[element]
        //     }
        // });
        // accessor[last] = data


        // console.log("DIR")
        // console.log(last);
        changeStateMap({data: stateMap['data'], start:stateMap['start']})
        await i.set('local-user-data', encrypt(JSON.stringify(stateMap['data'])));
        // console.log(stateMap.data)

        await db.ref(userId + "/" + dir).set(data);

        // console.log(await getUserData(dir))
    }




    let data = stateMap.data
    const value = {
        writeUserData,
        syncData,
        clear,
        deleteUserData,
        encrypt,
        changeMultiplier,
        multiplier,
        options,
        // getUserData,
        data
    }

    return (
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    )
}