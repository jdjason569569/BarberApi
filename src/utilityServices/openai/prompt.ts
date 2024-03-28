// import fetch from 'node-fetch';

// const apiUrl = 'http://localhost:3000/api/statistics/usertime';

 
 const DATE_BASE = [
    `public.customer (id_customer, phone, name, id_users, disable)`,
    '34	3145410018	andrés castro 	7	f',
    '35	3007183091	fernando 	7	f',
    '36	3206734633	cliente juan	6	f',
    '37	3127761423	fernando 	6	f',
    '38	3132652334	armando 	6	f',
    '40	3168781067	jose rivera	5	f',
    '41	3137688515	jose ospina	5	f',
    '42	3216131058	kevin	6	f',
    '43	3216084557	andres 	6	f',
    '44	3124867983	cristiano ronaldo 	6	f',
    '45	3233494728	david sarria	5	f',
    '39	3206421072	elkin junior	5	f',
    '46	3126817255	jon velasco	5	f',
    '47	3127841461	gerardo 	5	f',
    '48	3216383802	castro nv	5	f',
    '49	3174772949	yilber acertemos	5	f',
    '50	3205389332	luis niche castro	5	f',
    '51	3207467668	jimy naturista 	5	f',
    '52	3207704420	fidel	5	f',
    '53	3142878946	javier policía 	5	f',
    '54	3105913284	fernando fisio 	5	f',
    '55	3114569502	jose	5	f',
    '56	3127173129	duran	5	f',
    '57	3183507724	ricardo ruiz 	5	f',
    '58	3103166915	mona	5	f',
    '59	3135604780	andrés ruales 	5	f',
    '60	3145472456	mono jeison yerson 	5	f',
    '61	3218762772	marthelo burbanon	5	f',
    '62	3042106482	andrés estánco 	5	f',
    '63	3115756693	samuel carnicero 	5	f',
    '64	3116011430	pedro pandi	5	f',
    '65	3122930775	alejandro pardo	5	f',
    '66	3106222949	juan felipe xtz	5	f',
    '67	3117869333	anderson cliente 	5	f',
    '68	3226769915	diego rolo	5	f',
    '69	3183875728	david sarria 	8	f',
    '70	3127118967	timy	5	f',
    '71	3148014734	alfred 	5	f',
    '72	3234790858	wilmer xtz	5	f',
    '73	3046372054	sebastián villamarín niches	5	f',
    '74	3242074083	sergio ficio 	5	f',
    '75	3205099338	lisandro 	5	f',
    '76	3135604401	cristina 	5	f',
    '77	3186902917	andres padrastro 	5	f',
    '78	3204689689	tobar goes 	5	f',
    '79	3124593206	javier rio 	5	f',
    '80	3182885990	andrés ordóñez cliente 	5	f',
    '81	3113786189	junior xtz	5	f',
    '82	3216348752	oscar reservado	5	f',
    '83	3103758172	yilen cliente 	5	f',
    '84	3046315159	josé ramírez 	5	f',
    '85	3122826520	yiyo 	5	f',
    '86	3168882499	estiven taller 	5	f',
    '87	3122630530	chichon	5	f',
    '88	3505710159	harol wifi	5	f',
    'public.turn (id, completed, "order", id_customer, "isSchedule", date_register, price, disable)',
    '15	f	5	43	f	2024-03-15 13:08:00+00	20000	t',
    '216	f	5	36	f	2024-03-15 16:00:00+00	16000	t',
    '325	t	1	36	f	2024-03-16 11:26:00+00	20000	f',
    '435	t	1	45	f	2024-03-21 12:00:00+00	13000	f',
    '436	t	2	70	f	2024-03-21 12:30:00+00	13000	f',
    '326	f	1	57	f	2024-03-16 23:00:00+00	13000	t',
    '437	t	3	49	f	2024-03-21 13:00:00+00	13000	f',
    '438	t	4	71	f	2024-03-21 13:30:00+00	13000	f',
    '439	f	5	74	f	2024-03-21 17:30:00+00	13000	f',
    '440	f	6	75	f	2024-03-21 18:00:00+00	13000	f',
    '548	t	12	86	f	2024-03-22 19:30:00+00	13000	f',
    '229	t	1	37	f	2024-03-15 00:05:00+00	16000	f',
    '230	t	2	37	f	2024-03-15 11:00:00+00	20000	f',
    '231	t	3	37	f	2024-03-15 11:56:00+00	19000	f',
    '191	f	2	38	f	2024-03-15 14:00:00+00	20000	t',
    '232	t	4	42	f	2024-03-15 12:30:00+00	13000	f',
    '233	t	5	36	f	2024-03-15 13:00:00+00	13000	f',
    '234	f	6	38	f	2024-03-15 14:00:00+00	13000	f',
    '235	f	7	44	f	2024-03-15 15:00:00+00	13000	f',
    '549	t	13	87	f	2024-03-22 20:00:00+00	13000	f',
    '455	f	5	80	f	2024-03-22 14:30:00+00	13000	t',
    '405	t	1	57	f	2024-03-16 11:00:00+00	12000	f',
    '406	t	2	58	f	2024-03-16 11:30:00+00	13000	f',
    '407	t	3	47	f	2024-03-16 12:00:00+00	13000	f',
    '214	f	5	44	f	2024-03-15 13:05:00+00	13000	t',
    '408	t	4	59	f	2024-03-16 12:30:00+00	13000	f',
    '409	t	5	60	f	2024-03-16 13:30:00+00	13000	f',
    '410	t	6	61	f	2024-03-16 14:00:00+00	13000	f',
    '411	t	7	63	f	2024-03-16 14:30:00+00	13000	f',
    '412	t	8	62	f	2024-03-16 15:00:00+00	13000	f',
    '413	t	9	64	f	2024-03-16 16:30:00+00	13000	f',
    '310	f	10	54	f	2024-03-15 18:30:00+00	13000	t',
    '417	f	13	68	f	2024-03-16 18:30:00+00	13000	f',
    '313	t	1	48	f	2024-03-15 10:30:00+00	20000	f',
    '314	t	2	41	f	2024-03-15 11:00:00+00	13000	f',
    '315	t	3	49	f	2024-03-15 11:29:00+00	13000	f',
    '316	t	4	39	f	2024-03-15 12:00:00+00	13000	f',
    '317	t	5	50	f	2024-03-15 12:30:00+00	13000	f',
    '414	t	10	66	f	2024-03-16 17:00:00+00	13000	f',
    '415	f	12	65	f	2024-03-16 18:00:00+00	13000	f',
    '416	t	11	67	f	2024-03-16 17:30:00+00	13000	f',
    '418	f	1	69	f	2024-03-19 21:05:00+00	35000	f',
    '419	t	1	36	f	2024-03-19 23:37:00+00	12000	f',
    '318	t	6	45	f	2024-03-15 13:00:00+00	13000	f',
    '319	t	7	51	f	2024-03-15 17:00:00+00	13000	f',
    '320	t	8	52	f	2024-03-15 17:30:00+00	13000	f',
    '321	t	9	53	f	2024-03-15 18:00:00+00	13000	f',
    '322	t	10	55	f	2024-03-15 19:00:00+00	13000	f',
    '323	f	11	47	f	2024-03-15 19:30:00+00	13000	f',
    '324	f	12	56	f	2024-03-15 20:00:00+00	13000	f',
    '537	t	1	76	f	2024-03-22 11:00:00+00	13000	f',
    '538	t	2	77	f	2024-03-22 11:30:00+00	13000	f',
    '539	t	3	78	f	2024-03-22 12:00:00+00	13000	f',
    '540	t	4	79	f	2024-03-22 13:00:00+00	13000	f',
    '541	t	5	80	f	2024-03-22 15:00:00+00	13000	f',
    '542	t	6	81	f	2024-03-22 15:30:00+00	13000	f',
    '543	t	7	83	f	2024-03-22 16:00:00+00	13000	f',
    '544	t	8	76	f	2024-03-22 16:30:00+00	13000	f',
    '545	f	9	82	f	2024-03-22 17:30:00+00	13000	f',
    '546	t	10	84	f	2024-03-22 18:30:00+00	13000	f',
    '547	t	11	85	f	2024-03-22 19:00:00+00	12000	f',
    '550	t	14	88	f	2024-03-22 20:30:00+00	13000	f',
].join('\n');




 

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data: []) => {
//     if (data) {
        
//         let result = data.map((value: any) =>{
//            return  `${value.name}: ${value.cantidad_turnos_completos}`
//         });
//         DATE_BASE = result

//         console.log("result ", DATE_BASE);
//     }
//   })
//   .catch(error => {
//     console.error('Error al hacer la solicitud:', error.message);
//   });


const PROMPT = `
Consulta la base de datos que te doy esta en la siguiente linea, pero sin explicacione de como sacar la informacion solo dame el resultado sin nombrar tablas ni cosas tecnicas
------
BASE_DE_DATOS="{context}"
------
INTERROGACIÓN_DEL_CLIENTE="{question}"
`
//NOMBRE_DEL_CLIENTE="{customer_name}"

/**
 * 
 * @param name 
 * @returns 
 */
const generatePrompt = (question: string): string => {
    return PROMPT.replace('{question}', question).replace('{context}', DATE_BASE)
}

export { generatePrompt }