export const TEST = `SELECT id_users FROM users LIMIT 1`;
export const COUNT_TURNS_BY_CUSTOMER = `SELECT c.id_customer, c.name, COUNT(t.id) AS cantidad_turnos_completos FROM users u INNER JOIN customer c ON u.id_users = c.id_users INNER JOIN turn t ON c.id_customer = t.id_customer WHERE u.id_users = $1 AND t.completed = true AND EXTRACT(MONTH FROM t.date_register) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY c.id_customer, c.name HAVING COUNT(t.id) >= 1`; 
export const TOTAL_PAY = `SELECT u.id_users, SUM(t.price) AS total FROM users u INNER JOIN customer c ON u.id_users = c.id_users INNER JOIN turn t ON c.id_customer = t.id_customer WHERE u.id_users = $1 AND t.completed = true AND EXTRACT(MONTH FROM t.date_register) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY  u.id_users;`
export const WINNER_DAY_PAY = `SELECT u.id_users, EXTRACT(DAY FROM t.date_register) AS dia_del_mes_mas_venta, SUM(t.price) AS dinero_total_por_dia FROM users u INNER JOIN customer c ON u.id_users = c.id_users INNER JOIN turn t ON c.id_customer = t.id_customer WHERE u.id_users = $1 AND t.completed = true AND u.id_users = $1 AND EXTRACT(MONTH FROM t.date_register) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY u.id_users, EXTRACT(DAY FROM t.date_register) ORDER BY u.id_users, dinero_total_por_dia DESC LIMIT 1;`
export const CUSTOMER_GOES = `SELECT c.id_customer, c.name, COUNT(t.id) AS citas_completadas FROM users u INNER JOIN customer c ON u.id_users = c.id_users INNER JOIN turn t ON c.id_customer = t.id_customer  WHERE t.completed = true AND EXTRACT(MONTH FROM t.date_register) = $1 AND u.id_users = $2   GROUP BY c.id_customer, c.name ORDER BY citas_completadas DESC LIMIT 1`;
export const BEST_DAY =  `SELECT EXTRACT(DAY FROM t.date_register) AS dia, COUNT(*) AS cantidad_turnos_completos, SUM(t.price) AS valor_total  FROM users u INNER JOIN customer c ON u.id_users = c.id_users  INNER JOIN turn t ON c.id_customer = t.id_customer WHERE t.completed = true AND EXTRACT(MONTH FROM t.date_register) = $1 AND u.id_users = $2 GROUP BY EXTRACT(DAY FROM t.date_register) ORDER BY valor_total DESC LIMIT 1`;
export const MONEY_BY_DAY =  `SELECT u.id_users, SUM(t.price) AS total FROM users u INNER JOIN customer c ON u.id_users = c.id_users INNER JOIN turn t ON c.id_customer = t.id_customer WHERE DATE(t.date_register) = $1 AND c.id_users = $2 AND t.completed = true GROUP BY u.id_users`;
export const MONEY_ALL_DAY = `SELECT EXTRACT(DAY FROM t.date_register) AS dia, CONCAT(TO_CHAR(t.date_register, 'Day'), ' ', EXTRACT(DAY FROM t.date_register)) AS nombre_dia, SUM(t.price) AS total_price FROM users u INNER JOIN customer c ON u.id_users = c.id_users  INNER JOIN turn t ON c.id_customer = t.id_customer WHERE t.date_register >= date_trunc('month', current_date) AND t.completed = true AND u.id_users = $1 AND t.date_register < date_trunc('month', current_date) + interval '1 month' GROUP BY EXTRACT(DAY FROM t.date_register), TO_CHAR(t.date_register, 'Day') ORDER BY dia;`;