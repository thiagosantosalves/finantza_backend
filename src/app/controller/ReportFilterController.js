import { subMonths, addMonths  } from 'date-fns';
import Releases from '../models/Releases';
import Account from '../models/Account';
import CardCredit from '../models/CardCredit';
import RcCategory from '../models/RcCategory';
import DpCategory from '../models/DpCategory';
import Tags from '../models/Tags';
import File from '../models/File';

class ReportFilterController {

    async show(request, response) {

        let rules = request.params.rulesfilter.split('&');

        try {

            let resDataLine = await Releases.findAll({
                where: {
                    user_id: request.userId,
                    year: rules[1],
                    type: rules[2],
                }
            });

            let res = await Releases.findAll({
                where: {
                    user_id: request.userId,
                    month: rules[0],
                    year: rules[1],
                    type: rules[2]
                },
                include: [
                    {
                        model: Account,
                        as: 'account',
                        attributes: ['id', 'name', 'type_id', 'type', 'color_hex', 'value']
                    },
                    {
                        model: CardCredit,
                        as: 'card_credit',
                        attributes: ['id', 'name', 'institution', 'id_institution', 'color_hex']
                    },
                    {
                        model: RcCategory,
                        as: 'rc_category',
                        attributes: ['id', 'name', 'id_icon', 'color_hex']
                    },
                    {
                        model: DpCategory,
                        as: 'dp_category',
                        attributes: ['id', 'name', 'id_icon', 'color_hex']
                    },
                    {
                        model: Tags,
                        as: 'tags',
                        attributes: ['id', 'name']
                    },
                    {
                        model: File,
                        as: 'anexo_img',
                        attributes: ['id', 'name', 'url', 'path']
                    }
                ]
            });

            if(rules[2] === '1') {
                res = res.reduce((soma, cur) => {
 
                    let id = cur.rc_category.id;
                    let repetido = soma.find(elem => elem.rc_category.id === id);
            
                    if (repetido) {
                        repetido.value += cur.value;
                    } else {
                        soma.push(cur);
                    }
        
                    return soma;
                }, []);
            }

            if(rules[2] === '2') {
                res = res.reduce((soma, cur) => {
 
                    let id = cur.dp_category.id;
                    let repetido = soma.find(elem => elem.dp_category.id === id);
            
                    if (repetido) {
                        repetido.value += cur.value;
                    } else {
                        soma.push(cur);
                    }
        
                    return soma;
                }, []);
            }

            if(rules[3] === '1') {
                res = res.reduce((soma, cur) => {
 
                    let id = cur.account.id;
                    let repetido = soma.find(elem => elem.account.id === id);
            
                    if (repetido) {
                        repetido.value += cur.value;
                    } else {
                        soma.push(cur);
                    }
        
                    return soma;
                }, []);
            }

            if(rules[3] === '2') {
            
                let resCard = res.filter(e => e.card_credit_id != null);

                if(resCard.length) {
                    res = resCard.reduce((soma, cur) => {
 
                        let id = cur.card_credit.id;
    
                        console.log(id)
    
                       let repetido = soma.find(elem => elem.card_credit.id === id);
                
                        if (repetido) {
                            repetido.value += cur.value;
                        } else {
                            soma.push(cur);
                        }
            
                        return soma;
                    }, []);
                }
            }

            let valueSum = res.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

            let  newRes = [];

            if(rules[2] === '1') {
                newRes = res.map(elem => {
    
                    let release = {
                        id: elem.id,
                        label: elem.rc_category.name,
                        value: elem.value,
                        color: elem.rc_category.color_hex,
                        idIcon: elem.rc_category.id_icon,
                        type: elem.type,
                        account: false,
                        card_credit: false
                    }
        
                    return release;
                });
            }

            if(rules[2] === '2') {
                newRes = res.map(elem => {
    
                    let release = {
                        id: elem.id,
                        label: elem.dp_category.name,
                        value: elem.value,
                        color: elem.dp_category.color_hex,
                        idIcon: elem.dp_category.id_icon,
                        type: elem.type,
                        account: false,
                        card_credit: false
                    }
        
                    return release;
                });
            }   

            if(rules[3] === '1') {

                newRes = res.map(elem => {

                    let release = {
                        id: elem.id,
                        label: elem.account.name,
                        value: elem.value,
                        color: elem.account.color_hex,
                        idIcon: elem.account.type_id,
                        type: elem.type,
                        account: true,
                        card_credit: false
                    }
        
                    return release;
                }); 
            }

            if(rules[3] === '2') {
                newRes = res.map(elem => {

                    let release = {
                        id: elem.id,
                        label: elem.card_credit.name,
                        value: elem.value,
                        color: elem.card_credit.color_hex,
                        idIcon: elem.card_credit.id_institution,
                        type: elem.type,
                        account: false,
                        card_credit: true
                    }
        
                    return release;
                });
            }

            let datePreviousTwo = subMonths(new Date(rules[1], rules[0], 1), 2);
            let datePreviousOne = subMonths(new Date(rules[1], rules[0], 1), 1);
            let dateNext = addMonths(new Date(rules[1], rules[0], 1), 1);

            let resPreviusTwo = '';
            let sumPreviusTwo = '';
            let resPreviusOne = '';
            let sumPreviusOne = '';
            let resPreviuNext = '';
            let sumPreviuNext = '';

            resPreviusTwo = resDataLine.filter(item => item.year === datePreviousTwo.getFullYear() && item.month === datePreviousTwo.getMonth() + 1);
            sumPreviusTwo = resPreviusTwo.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

            resPreviusOne = resDataLine.filter(item => item.year === datePreviousOne.getFullYear() && item.month === datePreviousOne.getMonth() + 1);
            sumPreviusOne = resPreviusOne.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
            
            resPreviuNext = resDataLine.filter(item => item.year === dateNext.getFullYear() && item.month === dateNext.getMonth() + 1);
            sumPreviuNext = resPreviuNext.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

            if(rules[3] === '1') {
                resPreviusTwo = resDataLine.filter(item => item.year === datePreviousTwo.getFullYear() && item.month === datePreviousTwo.getMonth() + 1 && item.account != null);
                sumPreviusTwo = resPreviusTwo.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
        
                resPreviusOne = resDataLine.filter(item => item.year === datePreviousOne.getFullYear() && item.month === datePreviousOne.getMonth() + 1 && item.account != null);
                sumPreviusOne = resPreviusOne.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
                
                resPreviuNext = resDataLine.filter(item => item.year === dateNext.getFullYear() && item.month === dateNext.getMonth() + 1 && item.account != null);
                sumPreviuNext = resPreviuNext.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
            }

            if(rules[3] === '2') {
                resPreviusTwo = resDataLine.filter(item => item.year === datePreviousTwo.getFullYear() && item.month === datePreviousTwo.getMonth() + 1 &&  item.card_credit != null);
                sumPreviusTwo = resPreviusTwo.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);

                resPreviusOne = resDataLine.filter(item => item.year === datePreviousOne.getFullYear() && item.month === datePreviousOne.getMonth() + 1 &&  item.card_credit != null);
                sumPreviusOne = resPreviusOne.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
                
                resPreviuNext = resDataLine.filter(item => item.year === dateNext.getFullYear() && item.month === dateNext.getMonth() + 1 && item.card_credit != null);
                sumPreviuNext = resPreviuNext.reduce((prevVal, elem) => Number(prevVal) + (Number(elem.value)), 0);
            }
            
            let dataLine = [
                { id: 1, key: new Date(datePreviousTwo.getFullYear(), datePreviousTwo.getMonth(), 1), b: sumPreviusTwo },
                { id: 2, key: new Date(datePreviousOne.getFullYear(), datePreviousOne.getMonth(), 1), b: sumPreviusOne },
                { id: 3, key: new Date(rules[1], rules[0], 1), b: valueSum },
                { id: 4, key: new Date(dateNext.getFullYear(), dateNext.getMonth(), 1), b: sumPreviuNext },
            ];

            return response.status(200).json({
                dataLine,
                newRes,
                valueSum
            });

        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new ReportFilterController();