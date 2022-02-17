import {useQueryClient} from "react-query";

export const useAuctionsFromCache = () => {
    const queryClient = useQueryClient();
    const auctions = queryClient.getQueryData('auctions');

    return auctions;
}