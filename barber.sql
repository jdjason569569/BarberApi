--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.2

-- Started on 2024-02-09 15:41:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: my_db_barber_e50b_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 220 (class 1259 OID 16433)
-- Name: config_id_seq; Type: SEQUENCE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE SEQUENCE public.config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.config_id_seq OWNER TO my_db_barber_e50b_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16434)
-- Name: config; Type: TABLE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE TABLE public.config (
    id_config integer DEFAULT nextval('public.config_id_seq'::regclass) NOT NULL,
    sessions integer DEFAULT 1,
    id_users integer
);


ALTER TABLE public.config OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 214 (class 1259 OID 16398)
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE SEQUENCE public.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: customer; Type: TABLE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE TABLE public.customer (
    id_customer integer DEFAULT nextval('public.customer_id_seq'::regclass) NOT NULL,
    phone character varying(200),
    name character varying(200),
    id_users integer,
    disable boolean DEFAULT false
);


ALTER TABLE public.customer OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 216 (class 1259 OID 16403)
-- Name: secuencia_turn; Type: SEQUENCE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE SEQUENCE public.secuencia_turn
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.secuencia_turn OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: turn; Type: TABLE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE TABLE public.turn (
    id integer DEFAULT nextval('public.secuencia_turn'::regclass) NOT NULL,
    completed boolean DEFAULT false,
    "order" integer,
    id_customer integer,
    "isSchedule" boolean DEFAULT false,
    date_register timestamp with time zone,
    price numeric,
    disable boolean DEFAULT false
);


ALTER TABLE public.turn OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 218 (class 1259 OID 16409)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 219 (class 1259 OID 16410)
-- Name: users; Type: TABLE; Schema: public; Owner: my_db_barber_e50b_user
--

CREATE TABLE public.users (
    id_users integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    register date NOT NULL,
    id_firebase character varying(100) NOT NULL,
    email character varying(150),
    active_sessions integer
);


ALTER TABLE public.users OWNER TO my_db_barber_e50b_user;

--
-- TOC entry 3017 (class 2606 OID 16415)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: my_db_barber_e50b_user
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id_customer);


--
-- TOC entry 3019 (class 2606 OID 16417)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: my_db_barber_e50b_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_users);


--
-- TOC entry 3020 (class 2606 OID 16418)
-- Name: customer fk_id_users; Type: FK CONSTRAINT; Schema: public; Owner: my_db_barber_e50b_user
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_id_users FOREIGN KEY (id_users) REFERENCES public.users(id_users);


--
-- TOC entry 3022 (class 2606 OID 16438)
-- Name: config fk_id_users; Type: FK CONSTRAINT; Schema: public; Owner: my_db_barber_e50b_user
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT fk_id_users FOREIGN KEY (id_users) REFERENCES public.users(id_users);


--
-- TOC entry 3021 (class 2606 OID 16423)
-- Name: turn fk_turn_customer; Type: FK CONSTRAINT; Schema: public; Owner: my_db_barber_e50b_user
--

ALTER TABLE ONLY public.turn
    ADD CONSTRAINT fk_turn_customer FOREIGN KEY (id_customer) REFERENCES public.customer(id_customer);


--
-- TOC entry 2051 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO my_db_barber_e50b_user;


--
-- TOC entry 2053 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO my_db_barber_e50b_user;


--
-- TOC entry 2052 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO my_db_barber_e50b_user;


--
-- TOC entry 2050 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO my_db_barber_e50b_user;


-- Completed on 2024-02-09 15:41:56

--
-- PostgreSQL database dump complete
--

