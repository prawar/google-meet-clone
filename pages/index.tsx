import s from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const createLobby = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };
  return (
    <div className={s.root}>
      <h1>Google Meet Clone</h1>
      <div className={s.enterRoom}>
        <input className={s.input} />
        <button className={s.button}>Join Room</button>
      </div>
      <span className={s.seprator}>-------------- OR ------------</span>
      <button className={s.button} onClick={createLobby}>
        Create Room
      </button>
    </div>
  );
}
