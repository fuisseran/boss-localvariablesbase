import { debug } from "console";

import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'fs'
import path from 'path'
const defaultLogger = {warn: console.log, info: console.log, debug: console.log, error: console.log}

export class LocalVariables {
  private logger: any
  private filePath!: string
  constructor(BASEDIR:string, logger:any = defaultLogger){
    const dataPath = path.resolve(path.join(BASEDIR, 'local_data'))
    if(!existsSync(dataPath)) try { mkdirSync(dataPath)} catch(err) {logger.error(`Failed to created ${dataPath}`)}
    const filePath = path.resolve(path.join(dataPath, '_localvars'))
    Object.defineProperties(this, {
      filePath: { value: filePath, writable: false },
      logger: { value: logger, writable: false }
    })
    if(existsSync(filePath)) try {
      const fileData = readFileSync(filePath).toString('utf8')
      if(fileData.trim().length > 0) {
        Object.assign(this, JSON.parse(fileData))
      }
    } catch (parseError) {
      logger.error(`Unable to parse ${filePath}`)
      
    }
  }
  save(){
    const {filePath, logger} = this
    writeFileSync(filePath, JSON.stringify(this, null, 2))
    logger.debug(`[${new Date().toLocaleString()}] Saved local variables`)
  }

}