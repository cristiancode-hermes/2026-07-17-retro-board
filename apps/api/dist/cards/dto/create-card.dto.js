"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardDto = exports.CreateCardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCardDto {
}
exports.CreateCardDto = CreateCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Card text content' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Author name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Column ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "columnId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Board ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "boardId", void 0);
class UpdateCardDto {
}
exports.UpdateCardDto = UpdateCardDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Card text content' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCardDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Move to column ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCardDto.prototype, "columnId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Card position in column' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCardDto.prototype, "position", void 0);
//# sourceMappingURL=create-card.dto.js.map