import {prisma} from "@repo/db"
export default async function Home() {
   const mod= 0;
   const users = await prisma.user.findMany();
  return (
    <div  >
       {JSON.stringify(users)}
    </div>
  );
}
 