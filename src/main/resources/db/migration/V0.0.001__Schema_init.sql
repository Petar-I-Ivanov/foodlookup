CREATE TABLE IF NOT EXISTS `food` (
    `food_id` BIGINT PRIMARY KEY,
    `description` VARCHAR(255) UNIQUE,
    `kcal` DECIMAL(10,2),
    `protein` DECIMAL(10,2),
    `fat` DECIMAL(10,2),
    `carbs` DECIMAL(10,2)
);
