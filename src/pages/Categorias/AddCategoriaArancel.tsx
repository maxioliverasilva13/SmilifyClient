import { useRouter } from "next/router";
import AddCategoriaModal from "src/components/AddCategoriaModal/AddCategoriaModal";
import appRoutes from "src/utils/appRoutes";

export default function AddCategoriaArancel() {
  const router = useRouter();

  return <AddCategoriaModal setOpen={() => router.push(appRoutes.index())} />;
}
