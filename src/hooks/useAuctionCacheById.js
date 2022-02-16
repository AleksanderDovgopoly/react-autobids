import {useQueryClient} from "react-query";

export const useAuctionCacheById = (auctionId) => {
    const queryClient = useQueryClient();
    let auctionData = queryClient.getQueryData(['auction', auctionId]);

    return auctionData;
}