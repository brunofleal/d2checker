
const MMRs = [50, 154, 308, 462, 616, 770, 924, 1078, 1232, 1386, 1540, 1694, 1848, 2002, 2156, 2310, 2464, 2618, 2772, 2926,
                3080, 3234, 3388, 3542, 3696, 3850, 4004, 4158, 4312, 4466, 4620, 4820, 5020, 5220, 5420]
const UNRANKED_MMR = -1;
const IMMORTAL_MMR = 5650;
const DIVINE_MMR = 4620;
const MAXIMUM_MMR_DIFF = 2800;

function getMMRDisparity(mmr1, mmr2) {
    if (mmr1 < 0 || mmr2 < 0) {
        return {};
    }
    if (mmr2 > mmr1) {
        [mmr1, mmr2] = [mmr2, mmr1];
    }

    if (mmr1 >= IMMORTAL_MMR && mmr2 < DIVINE_MMR) {
        return {hasDisparity:true, reason:"IMMORTAL_REQUIREMENT", mmr1, mmr2};
    }

    let diff = mmr1 - mmr2;
    if (diff > MAXIMUM_MMR_DIFF) {
        return {hasDisparity:true, reason:"MMR_DIFFERENCE", mmr1, mmr2};
    }

    return {};
}


function MMRToRankAndStars(mmr) {
    let rank = 0;
    let stars = 0;
    if (mmr < 0) {
        return {rank:0, stars:0};
    } else if (mmr >= IMMORTAL_MMR - 10) {
        console.log("****")
        return {rank:8, stars:0};
    } else if (mmr >= MMRs[MMRs.length-1] &&  mmr < IMMORTAL_MMR - 10) {
        console.log("aqui nao")
        return {rank:7, stars:5};
    }

    for (let i = 0; i < MMRs.length; i++) {
        if (mmr >= MMRs[i] && mmr < MMRs[i+1]) {
            rank = Math.floor((i+1)/5)+1;
            stars = (i + 1)%5;
            console.log("aaaaa")
            return {rank, stars};
        }
    }
};

function rankAndStarsToMMR(rank, stars) {
    if (rank === 0) {
        return UNRANKED_MMR;
    }
    if (rank === 8) {
        return IMMORTAL_MMR;
    }
    let index = Math.min((rank-1)*5 + (stars-1), MMRs.length);
    console.log({rank, stars})
    return MMRs[index];
};

let ranksLogic = {MMRToRankAndStars, rankAndStarsToMMR, getMMRDisparity};
export default ranksLogic;