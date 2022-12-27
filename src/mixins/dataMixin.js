import _ from 'lodash'

export default {
    data: () => {
      return {
        series: '06',
        images: [
          "t01-008.png",
          "t04-010.png",
          "t08-040.png",
          "t09-022.png",
          "t09-023.png",
          "t10-004.png",
          "t10-019.png",
          "t11-005.png",
          "t11-032.png",
          "t12-001.png",
          "t13-003.png",
          "t13-024.png",
          "t16-017.png",
          "t16-009.png"
        ],
        type: {
          t01 : "노말",
          t02 : "격투",
          t03 : "독",
          t04 : "땅",
          t05 : "비행",
          t06 : "벌레",
          t07 : "바위",
          t08 : "고스트",
          t09 : "강철",
          t10 : "불꽃",
          t11 : "물",
          t12 : "전기",
          t13 : "풀",
          t14 : "얼음",
          t15 : "에스퍼",
          t16 : "드래곤",
          t17 : "악",
          t18 : "페어리",
        }             
      }
    },
    methods: {
      getDisk(type, isRecommend) {
        let retVal
        let recommendArr = [] // 추천
        let weakEffectArr = [] // 효과 약함
        let notRecommendArr = [] // 미추천
    
        type.split("/").forEach((value) => {
            switch (value) {
            case "노말":
            // 추천
            recommendArr.push("격투")
    
            // 비추천
            notRecommendArr.push("고스트")
            break
            case "격투":
            // 추천
            recommendArr.push("비행")
            recommendArr.push("에스퍼")
            recommendArr.push("페어리")
    
            // 효과 약함
            weakEffectArr.push('벌레')
            weakEffectArr.push('바위')
            weakEffectArr.push('악')
            break
            case "독":
            // 추천
            recommendArr.push("땅")
            recommendArr.push("에스퍼")
    
            // 효과 약함
            weakEffectArr.push('격투')
            weakEffectArr.push('독')
            weakEffectArr.push('벌레')
            weakEffectArr.push('풀')
            weakEffectArr.push('페어리')
            break
            case "땅":
            // 추천
            recommendArr.push("물")
            recommendArr.push("풀")
            recommendArr.push("얼음")
    
            // 효과 약함
            weakEffectArr.push('독')
            weakEffectArr.push('바위')
    
            // 비추천
            notRecommendArr.push('전기')
            break
            case "비행":
            // 추천
            recommendArr.push("바위")
            recommendArr.push("전기")
            recommendArr.push("얼음")
    
            // 효과 약함
            weakEffectArr.push('격투')
            weakEffectArr.push('벌레')
            weakEffectArr.push('풀')
    
            // 비추천
            notRecommendArr.push('땅')          
            break
            case "벌레":
            // 추천
            recommendArr.push("비행")
            recommendArr.push("바위")
            recommendArr.push("불꽃")
    
            // 효과 약함
            weakEffectArr.push('격투')
            weakEffectArr.push('땅')
            weakEffectArr.push('풀')
            break
            case "바위":
            // 추천
            recommendArr.push("격투")
            recommendArr.push("땅")
            recommendArr.push("강철")
            recommendArr.push("물")
            recommendArr.push("풀")
    
            // 효과 약함
            weakEffectArr.push('노말')
            weakEffectArr.push('독')
            weakEffectArr.push('비행')
            weakEffectArr.push('불꽃')
            break
            case "고스트":
            // 추천
            recommendArr.push("고스트")
            recommendArr.push("악")
    
            // 효과 약함
            weakEffectArr.push('독')
            weakEffectArr.push('벌레')
    
            // 비추천
            notRecommendArr.push("노말")
            notRecommendArr.push("격투")
            break
            case "강철":
            // 추천
            recommendArr.push("격투")
            recommendArr.push("땅")
            recommendArr.push("불꽃")
    
            // 효과 약함
            weakEffectArr.push('노말')
            weakEffectArr.push('비행')
            weakEffectArr.push('벌레')
            weakEffectArr.push('바위')
            weakEffectArr.push('강철')
            weakEffectArr.push('풀')
            weakEffectArr.push('얼음')
            weakEffectArr.push('에스퍼')
            weakEffectArr.push('드래곤')
            weakEffectArr.push('페어리')
    
            // 비추천
            notRecommendArr.push('독')          
            break
            case "불꽃":
            // 추천
            recommendArr.push("땅")
            recommendArr.push("바위")
            recommendArr.push("물")
    
            // 효과 약함
            weakEffectArr.push('벌레')
            weakEffectArr.push('강철')
            weakEffectArr.push('불꽃')
            weakEffectArr.push('풀')
            weakEffectArr.push('얼음')
            weakEffectArr.push('페어리')
            break
            case "물":
            // 추천
            recommendArr.push("전기")
            recommendArr.push("풀")
    
            // 효과 약함
            weakEffectArr.push('강철')
            weakEffectArr.push('불꽃')
            weakEffectArr.push('물')
            weakEffectArr.push('얼음')
            break
            case "전기":
            // 추천
            recommendArr.push("땅")
    
            // 효과 약함
            weakEffectArr.push('비행')
            weakEffectArr.push('강철')
            weakEffectArr.push('전기')
            break
            case "풀":
            // 추천
            recommendArr.push("독")
            recommendArr.push("비행")
            recommendArr.push("벌레")
            recommendArr.push("불꽃")
            recommendArr.push("얼음")
    
            // 효과 약함
            weakEffectArr.push('땅')
            weakEffectArr.push('물')
            weakEffectArr.push('전기')
            weakEffectArr.push('풀')
            break
            case "얼음":
            // 추천
            recommendArr.push("격투")
            recommendArr.push("바위")
            recommendArr.push("강철")
            recommendArr.push("불꽃")
    
            // 효과 약함
            weakEffectArr.push('얼음')
            break
            case "에스퍼":
            // 추천
            recommendArr.push("벌레")
            recommendArr.push("고스트")
            recommendArr.push("악")
    
            // 효과 약함
            weakEffectArr.push('격투')
            weakEffectArr.push('에스퍼')
            break
            case "드래곤":
            // 추천
            recommendArr.push("얼음")
            recommendArr.push("드래곤")
            recommendArr.push("페어리")
    
            // 효과 약함
            weakEffectArr.push('불꽃')
            weakEffectArr.push('물')
            weakEffectArr.push('전기')
            weakEffectArr.push('풀')
            break
            case "악":
            // 추천
            recommendArr.push("격투")
            recommendArr.push("벌레")
            recommendArr.push("페어리")
    
            // 효과 약함
            weakEffectArr.push('고스트')
            weakEffectArr.push('악')
    
            // 비추천
            notRecommendArr.push("에스퍼")
            break
            case "페어리":
            //추천
            recommendArr.push("독")
            recommendArr.push("강철")
    
            // 효과 약함
            weakEffectArr.push('격투')
            weakEffectArr.push('벌레')
            weakEffectArr.push('악')
    
            // 비추천
            notRecommendArr.push("드래곤")
            break                                                                                                                                                 
            }
        })
        
        if (isRecommend) {
            // 비추천 배열 합치기
            const tmpArr = _.concat(weakEffectArr, notRecommendArr);
    
            let arr = []
            // 추천배열에서 제외하여 반환
            _.forEach(recommendArr, function(value) {
            if (!_.includes(tmpArr, value)) {
                arr.push(value)
            }
            })
    
            retVal = _.uniq(arr)
            return _(retVal).sortBy().value()
        } else {
            retVal = _.uniq(notRecommendArr)
            return _(retVal).sortBy().value()
        }
      }
    }
  }  