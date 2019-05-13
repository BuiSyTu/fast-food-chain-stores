CREATE DATABASE  IF NOT EXISTS `fast-food-chain-stores` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `fast-food-chain-stores`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: fast-food-chain-stores
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `accounts` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_username` varchar(45) NOT NULL,
  `a_password` varchar(200) NOT NULL,
  `a_role` varchar(45) NOT NULL,
  `a_name` varchar(45) NOT NULL,
  `a_dob` date NOT NULL,
  `a_gender` varchar(45) NOT NULL,
  `a_address` varchar(200) DEFAULT NULL,
  `a_phone` varchar(45) NOT NULL,
  `a_email` varchar(45) DEFAULT NULL,
  `a_created_at` date NOT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'duongquang','$2b$10$HkqB2pyko44QOmvSX8kxm.Z3UjaV5imNJx4VNlv1faRnp450C4E/C','user','Duong Dinh Quang','1997-11-16','Nam','Ha Noi','0364448460','duongquang@gmail.com','2019-05-10'),(2,'duongquang1111','$2b$10$HkqB2pyko44QOmvSX8kxm.Z3UjaV5imNJx4VNlv1faRnp450C4E/C','user','Duong Dinh Le','1997-11-16','Nam','Ha Noi','0364448460','duongquang@gmail.com','2019-05-10'),(3,'daole0606','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(4,'daole06061','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(5,'daole06062','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(6,'daole06063','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(7,'daole06064','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(8,'daole06065','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','user','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(9,'daole06066','$2b$10$chiReUidm24fPTBtVDG2Lui7smttjuZ/5G9FzS6iQ1P40cYGe5rPO','employee','Dao Thi Le','1997-01-06','Nam','Ha Noi','1111111111','','2019-05-10'),(11,'quangquang','$2b$10$LJ9vYGATpyeLxhOS2oFT8OCi4yZznlqscXKzs.ge5mckSDEx0eoBi','user','Duong Dinh Le','1999-11-11','Nam','Ha Noi','222222222','duongquang@gmail.com','2019-05-12');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_detail`
--

DROP TABLE IF EXISTS `bill_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bill_detail` (
  `bd_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_id` int(11) NOT NULL,
  `f_id` int(11) NOT NULL,
  `bd_quantity` int(11) NOT NULL,
  PRIMARY KEY (`bd_id`),
  KEY `billdetail_bills_idx` (`b_id`),
  KEY `billdetail_foods_idx` (`f_id`),
  CONSTRAINT `billdetail_bills` FOREIGN KEY (`b_id`) REFERENCES `bills` (`b_id`),
  CONSTRAINT `billdetail_foods` FOREIGN KEY (`f_id`) REFERENCES `foods` (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (1,3,4,3),(2,3,1,2),(3,4,4,7),(4,4,7,3),(5,5,1,2);
/*!40000 ALTER TABLE `bill_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bills` (
  `customer_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `s_id` int(11) NOT NULL,
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_created_at` datetime NOT NULL,
  `b_status` int(11) NOT NULL,
  `b_hour` int(11) NOT NULL,
  `b_day_of_week` int(11) NOT NULL,
  `b_week_of_year` int(11) DEFAULT NULL,
  `b_month_of_year` int(11) DEFAULT NULL,
  `b_year` int(11) DEFAULT NULL,
  `b_payment_method` int(11) NOT NULL,
  `b_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`b_id`),
  KEY `bill_customer_idx` (`customer_id`),
  KEY `bills_emplyee_idx` (`employee_id`),
  KEY `bills_stores_idx` (`s_id`),
  CONSTRAINT `bills_customer` FOREIGN KEY (`customer_id`) REFERENCES `accounts` (`a_id`),
  CONSTRAINT `bills_emplyee` FOREIGN KEY (`employee_id`) REFERENCES `accounts` (`a_id`),
  CONSTRAINT `bills_stores` FOREIGN KEY (`s_id`) REFERENCES `stores` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,NULL,1,3,'2019-05-12 09:45:31',0,9,0,20,4,NULL,0,NULL),(1,NULL,1,4,'2019-05-12 09:48:33',0,9,0,20,4,NULL,0,NULL),(1,NULL,1,5,'2019-05-12 11:10:29',0,11,0,20,4,NULL,0,NULL);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `favourites` (
  `fv_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id` int(11) NOT NULL,
  `a_id` int(11) NOT NULL,
  PRIMARY KEY (`fv_id`),
  KEY `favourites_food_idx` (`f_id`),
  KEY `favourites_accounts_idx` (`a_id`),
  CONSTRAINT `favourites_accounts` FOREIGN KEY (`a_id`) REFERENCES `accounts` (`a_id`),
  CONSTRAINT `favourites_foods` FOREIGN KEY (`f_id`) REFERENCES `foods` (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (7,2,3),(8,3,2),(9,2,3),(10,3,4),(11,4,5),(12,3,2),(14,8,9),(15,3,2),(16,4,3),(18,2,5),(19,1,7),(20,3,8),(21,4,9),(22,5,4),(23,6,2),(24,3,5),(25,2,6),(26,4,6),(28,4,2);
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `foods` (
  `t_id` int(11) NOT NULL,
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `f_price` double NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `f_size` varchar(45) NOT NULL,
  `f_url` varchar(255) NOT NULL,
  PRIMARY KEY (`f_id`),
  KEY `foods_types_idx` (`t_id`),
  CONSTRAINT `foods_types` FOREIGN KEY (`t_id`) REFERENCES `types` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (1,1,10000,'Cà phê','1','caphe'),(2,2,20000,'Cà phê','1','caphe'),(1,3,20000,'Cà phê','1','caphe'),(3,4,10000,'Cà phê','1','caphe'),(9,5,20000,'Trà sữa','1','trasua'),(5,6,20000,'Trà sữa','1','trasua'),(2,7,10000,'Trà sữa','1','trasua'),(3,8,20000,'Trà sữa','1','trasua'),(5,9,20000,'Trà sữa','1','trasua'),(1,10,12000,'Trà sữa','2','trasua'),(2,11,24000,'Trà sữa','2','trasua'),(1,12,22000,'Trà sữa','2','trasua'),(3,13,14000,'Cà phê','1','caphe'),(9,14,22000,'Trà sữa','2','trasua'),(5,15,22000,'Trà sữa','2','trasua'),(2,16,14000,'Trà sữa','2','trasua'),(3,17,22000,'Trà sữa','2','trasua'),(5,18,22000,'Trà sữa','2','trasua');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stores` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) NOT NULL,
  `s_address` varchar(255) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Store 1','Ha Noi'),(2,'Store 2','Ha Noi'),(3,'Store 3','Ha Noi'),(4,'Store 4','Ha Noi'),(5,'Store 5','Ha Noi'),(6,'Store 6','Ha Noi'),(7,'Store 7','Ha Noi');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `types` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(255) NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'Trà sữa trân châu trắng'),(2,'Trà sữa Oreo Cake Cream'),(3,'Cà phê sữa'),(4,'Trà xoài kem cheese'),(5,'Trà sữa matcha đậu đỏ'),(6,'Trà sữa Oreo Chocolate Cream'),(7,'Trà sữa khoai môn'),(8,'Trà sữa Pudding đậu đỏ'),(9,'Trà sữa long nhãn');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-12 16:26:54
