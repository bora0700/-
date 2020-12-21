import pickle
#import torch
#from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler

'''
class SentimentAnalyzer:
    def __init__(self, input):

        with open('electra_model.pickle', 'rb') as f:
            self.electra_model = pickle.load(f)

        with open('electra_tokenizer.pickle', 'rb') as f:
            self.electra_tokenizer = pickle.load(f)

        self.input = input

    def make_data(string):
        datas = []
        datas.append((0, string, 0))

        return datas

    def convert_data2dataset(datas, tokenizer, max_length):
        total_input_ids, total_attention_mask, total_token_type_ids, total_labels = [], [], [], []
        # for index, data in enumerate(datas, desc="convert_data2dataset")):
        for index, data in enumerate(datas):
            _, sequence, label = data
            tokens = tokenizer.tokenize(sequence)

            tokens = ["[CLS]"] + tokens
            tokens = tokens[:max_length - 1]
            tokens.append("[SEP]")

            input_ids = [tokenizer._convert_token_to_id(token) for token in tokens]
            assert len(input_ids) <= max_length

            attention_mask = [1] * len(input_ids)
            token_type_ids = [0] * len(input_ids)

            padding = [0] * (max_length - len(input_ids))

            input_ids += padding
            attention_mask += padding
            token_type_ids += padding

            total_input_ids.append(input_ids)
            total_attention_mask.append(attention_mask)
            total_token_type_ids.append(token_type_ids)
            total_labels.append(label)

        total_input_ids = torch.tensor(total_input_ids, dtype=torch.long)
        total_attention_mask = torch.tensor(total_attention_mask, dtype=torch.long)
        total_token_type_ids = torch.tensor(total_token_type_ids, dtype=torch.long)
        total_labels = torch.tensor(total_labels, dtype=torch.long)

        dataset = TensorDataset(total_input_ids, total_attention_mask, total_token_type_ids, total_labels)

        return dataset

    def do_analyze(electra_model, test_dataloader, mode):
        # 모델의 입력, 출력, 실제 정답값을 담을 리스트
        total_input_ids, total_predicts, total_corrects = [], [], []
        # for step, batch in enumerate(test_dataloader, desc="do_analyze")):
        for step, batch in enumerate(test_dataloader):
            batch = tuple(t.cuda() for t in batch)
            input_ids, attention_mask, token_type_ids, labels = batch[0], batch[1], batch[2], batch[3]

            # 입력 데이터에 대한 출력 결과 생성
            predicts = electra_model(input_ids, attention_mask, token_type_ids)

            predicts = predicts.argmax(dim=-1)
            predicts = predicts.cpu().detach().numpy().tolist()
            labels = labels.cpu().detach().numpy().tolist()
            input_ids = input_ids.cpu().detach().numpy().tolist()

            total_predicts += predicts
            total_corrects += labels
            total_input_ids += input_ids

        return total_input_ids, total_predicts

    def show_result(self, total_input_ids, total_predicts, tokenizer):
        for index, input_ids in enumerate(total_input_ids):
            tokens = [tokenizer._convert_id_to_token(input_id) for input_id in input_ids]

            # [CLS] 토큰 제거
            tokens = tokens[1:]

            # [SEP] 토큰 제거
            tokens = tokens[:tokens.index("[SEP]")]

            # 입력 sequence 복원
            sequence = tokenizer.convert_tokens_to_string(tokens)

            predict = total_predicts[index]
            if predict == 0:
                predict = "negative"
            else:
                predict = "positive"

            print("sequence : {}".format(sequence))
            print("predict : {}".format(predict))
            print()

            return predict

    def analyze(self):
        # 평가 데이터 읽기
        test_datas = self.make_data(self.input)
        # 평가 데이터 전처리
        test_dataset = self.convert_data2dataset(datas=test_datas, tokenizer=self.electra_tokenizer, max_length=60)

        # 평가 데이터를 batch 단위로 추출하기 위한 DataLoader 객체 생성
        test_sampler = SequentialSampler(test_dataset)
        test_dataloader = DataLoader(test_dataset, sampler=test_sampler, batch_size=100)

        self.electra_model.eval()

        # 평가 데이터에 대한 정확도와 모델의 입력, 출력, 정답
        total_input_ids, total_predicts = self.do_analyze(electra_model=self.electra_model,
                                                          test_dataloader=test_dataloader,
                                                          mode="test")

        return self.show_result(total_input_ids=total_input_ids, total_predicts=total_predicts, tokenizer=self.electra_tokenizer)
'''
