# Function to get list of divisors
def get_list_of_divisors(num):
    list_of_divisors = [i for i in range(1, int(num/2+1)) if num % i == 0]
    return list_of_divisors

# Function to check if a number is abundant/deficient or perfect
def check_num_classify(num):
    list_of_divisors = get_list_of_divisors(num)
    sum_of_divisors = sum(list_of_divisors)
    if sum_of_divisors > num:
        print(f'{num} is abundant number, its list of divisors {list_of_divisors} and sum of divisors {sum_of_divisors} > {num}')
    elif sum_of_divisors < num:
        print(f'{num} is deficient number, its list of divisors {list_of_divisors} and sum of divisors {sum_of_divisors} < {num}')
    elif sum_of_divisors == num:
        print(f'{num} is perfect number, its list of divisors {list_of_divisors} and sum of divisors {sum_of_divisors} = {num}')

# Entry point of execution
if __name__ == "__main__":
    try:
        # Take space delimited input array of numbers to check classification
        list_of_num=list(map(int, input("Enter numbers to check the classification: ").strip().split()))
        for num in list_of_num:
            check_num_classify(num)
    except Exception as e:
        print("Please enter valid numbers only", e)