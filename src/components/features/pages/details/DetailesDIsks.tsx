import { IDisk } from "../../../../store/models/Disk";

import "../../../../assets/details_disks.css";

export default function DetailesDIsks({ disks = [] }: { disks: IDisk[] }) {
    return <>
        {
            disks.map((e: IDisk, i) => 
                <div className="collection_disk_meta" key={i}>
                    <div className="collection_disk_index">
                        Disk {i + 1}
                    </div>

                    <ul className="collection_disk_song_list">
                        {
                            e.songs.map((song) => <li key={song.name}> { song.name } </li>)
                        }
                    </ul>
                </div>
            )
        }
    </>
}