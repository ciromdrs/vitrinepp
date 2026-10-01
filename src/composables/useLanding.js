import { useApi } from "./useApi";
import { getLinhas } from "@/services/planilha";
import { SHEET_URL } from "@/constants/sheetNames";
import { ref } from "vue";

export function useLanding() {
    const { isLoading, error } = useApi();

    const landingImgURL = ref({});

    const carregarLandingImg = async () => {
        isLoading.value = true; 
        try {
            const data = await getLinhas(SHEET_URL.LANDING);
            if (data) landingImgURL.value = data[0];
        }
        catch (err){
            error.value = err;
        } finally{
            isLoading.value = false
        }
    }

    return { isLoading, error, landingImgURL, carregarLandingImg };
}