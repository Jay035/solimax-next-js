import { ActivePools } from "../../../data/PoolsData";

export default function handler(req, res){
    res.status(200).json(ActivePools)
    console.log(res)
}